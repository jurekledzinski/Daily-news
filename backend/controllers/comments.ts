import xss from 'xss';
import { CommentSchema, IComment, LikesSchema } from '../models';
import { CustomError } from '../error';
import { getCollectionDb } from '../config';
import { ObjectId } from 'mongodb';
import { PAGE_SIZE, STATUS_CODE } from '../constants';
import { Request, Response } from 'express';
import { transformDocument } from '../helpers';
import { tryCatch } from '../helpers';
import {
  buildResponse,
  calculateSkipCount,
  commentAggergation,
} from '../helpers';

const collection = getCollectionDb<IComment>('comments');

export const getComments = tryCatch<IComment[]>(
  async (req: Request, res: Response) => {
    console.log('get comments collection', collection);
    console.log('req params', req.params);
    console.log('req query', req.query);

    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    const idArticle = decodeURIComponent(req.params.article_id);
    const page = req.query.page ?? '1';
    const skipCount = calculateSkipCount(page);

    console.log('req idArticle decoded', idArticle);
    console.log('req page number from query', page);
    console.log('req skipCount', skipCount);

    const total = await collection.countDocuments({
      idArticle,
      parentCommentId: null,
    });

    console.log('total', total);

    const result = await commentAggergation(
      idArticle,
      null,
      skipCount,
      PAGE_SIZE
    );

    console.log('result commentAggergation', result);

    const formatResults = transformDocument<IComment>(result);

    console.log('formatResults', formatResults);

    const totalPages = Math.ceil(total / PAGE_SIZE);
    console.log('totalPages', totalPages);

    const aaa = buildResponse(formatResults, page, totalPages);
    console.log('get comments ', buildResponse);

    return res.status(STATUS_CODE.OK).json({
      ...buildResponse(formatResults, page, totalPages),
    });
  }
);

export const getCommentReplies = tryCatch<IComment[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    const idArticle = decodeURIComponent(req.params.article_id);
    const comment_id = req.params.comment_id;
    const page = req.query.page_reply ?? '1';
    const skipCount = calculateSkipCount(page);

    const total = await collection.countDocuments({
      idArticle,
      parentCommentId: comment_id,
    });

    const result = await commentAggergation(
      idArticle,
      comment_id,
      skipCount,
      PAGE_SIZE
    );

    const formatResults = transformDocument<IComment>(result);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return res.status(STATUS_CODE.OK).json({
      ...buildResponse(formatResults, page, totalPages),
      replyCount: total,
    });
  }
);

export const createComment = tryCatch(async (req: Request, res: Response) => {
  const parsedData = CommentSchema.parse(req.body);

  const parentId = req.body.parentCommentId === 'null';

  if (!collection) {
    throw new CustomError(
      'Internal server error',
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
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
});

export const updateCommentLikes = tryCatch(
  async (req: Request, res: Response) => {
    const parsedData = LikesSchema.parse(req.body);

    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
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
  }
);
