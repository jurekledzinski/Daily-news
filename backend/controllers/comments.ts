import xss from 'xss';
import { Comment, CommentSchema, DataDB } from '../models';
import { commentAggergation, formatDBDocumentId } from '../helpers';
import { getCollectionDb } from '../config';
import { PAGE_SIZE, STATUS_CODE, STATUS_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import { Request, Response } from 'express';
import { throwError } from '../error';

const collection = getCollectionDb<DataDB<Comment>>('comments');

export const getComments = async (req: Request, res: Response) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const articleId = decodeURIComponent(req.params.article_id);
  const page = (req.query.page ?? '1').toString();
  const skipCount = (parseInt(page) - 1) * PAGE_SIZE;

  const total = await collection.countDocuments({ articleId });

  const result = await commentAggergation(articleId, skipCount, PAGE_SIZE);

  const formatResults = formatDBDocumentId(result);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return res.status(STATUS_CODE.OK).json({
    payload: formatResults,
    currentPage: parseInt(page),
    hasNextPage: totalPages > parseInt(page),
    totalPages,
  });
};

export const createComment = async (req: Request, res: Response) => {
  const parsedData = CommentSchema.omit({ createdAt: true }).parse(req.body);

  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  await collection.insertOne({
    createdAt: new Date(),
    articleId: xss(parsedData.articleId),
    text: xss(parsedData.text),
    user: xss(parsedData.user),
    userId: xss(parsedData.userId),
  });

  return res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGE['addComment'], success: true });
};
