import xss from 'xss';
import { buildResponse, calculateSkipCount, commentAggergation } from '../helpers';
import { CommentSchema, IComment, LikesSchema } from '../models';
import { getCollectionDb } from '../config';
import { ObjectId } from 'mongodb';
import { PAGE_SIZE, STATUS_CODE, STATUS_MESSAGE } from '../constants';
import { Request, Response } from 'express';
import { throwError } from '../error';
import { transformDocument } from '../helpers';

const collection = getCollectionDb<IComment>('comments');

export const getComments = async (req: Request, res: Response) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const idArticle = decodeURIComponent(req.params.article_id);
  const page = (req.query.page ?? '1') as string;
  const skipCount = calculateSkipCount(page);

  const total = await collection.countDocuments({
    idArticle,
    parentCommentId: null,
  });

  const result = await commentAggergation(idArticle, null, skipCount, PAGE_SIZE);

  const formatResults = transformDocument<IComment>(result);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return res.status(STATUS_CODE.OK).json({
    ...buildResponse(formatResults, page, totalPages),
  });
};

export const getCommentReplies = async (req: Request, res: Response) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const idArticle = decodeURIComponent(req.params.article_id);
  const comment_id = req.params.comment_id;
  const page = (req.query.page_reply ?? '1') as string;
  const skipCount = calculateSkipCount(page);

  const total = await collection.countDocuments({
    idArticle,
    parentCommentId: comment_id,
  });

  const result = await commentAggergation(idArticle, comment_id, skipCount, PAGE_SIZE);

  const formatResults = transformDocument<IComment>(result);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return res.status(STATUS_CODE.OK).json({
    ...buildResponse(formatResults, page, totalPages),
    replyCount: total,
  });
};

export const createComment = async (req: Request, res: Response) => {
  const parsedData = CommentSchema.parse(req.body);

  const parentId = req.body.parentCommentId === 'null';

  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const likes = xss(parsedData.likes.toString());

  await collection.insertOne({
    createdAt: xss(parsedData.createdAt),
    idArticle: xss(parsedData.idArticle),
    likes: parseInt(likes),
    text: xss(parsedData.text),
    user: xss(parsedData.user),
    userId: xss(parsedData.userId),
    parentCommentId: parentId ? null : xss(parsedData.parentCommentId ?? ''),
  });

  return res.status(STATUS_CODE.OK).json({ success: true });
};

export const updateCommentLikes = async (req: Request, res: Response) => {
  const parsedData = LikesSchema.parse(req.body);

  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const articleId = decodeURIComponent(req.params.article_id);
  const commentId = req.params.comment_id;

  const likes = xss(parsedData.likes.toString());

  await collection.updateOne(
    {
      _id: new ObjectId(commentId),
      idArticle: articleId,
    },
    { $inc: { likes: parseInt(likes) } }
  );

  return res.status(STATUS_CODE.OK).json({ success: true });
};
