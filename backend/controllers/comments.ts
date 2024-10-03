import CustomError from '../error/error';
import { CommentSchema, IComment } from '../models/comments';
import { getCollectionDb } from '../config/db';
import { WithId } from 'mongodb';
import { Request, Response } from 'express';
import { transformDocument } from '../helpers/transformData';
import { tryCatch } from '../helpers/tryCatch';

const collection = getCollectionDb<IComment>('comments');

export const getComments = tryCatch<IComment[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const article_id = decodeURIComponent(req.params.article_id);
    const page = req.query.page ?? '1';
    const pageSize = 10;
    const skipCount = (parseInt(page.toString()) - 1) * pageSize;

    const total = await collection.countDocuments({
      idArticle: article_id,
      parentCommentId: null,
    });

    const result = await collection
      .find({ idArticle: article_id, parentCommentId: null })
      .sort({ createdAt: 1 })
      .skip(skipCount)
      .limit(pageSize)
      .toArray();

    const formatResults = transformDocument<WithId<IComment>>(result);

    return res.status(200).json({
      payload: { result: formatResults },
      success: true,
      totalPages: Math.ceil(total / pageSize),
      page: parseInt(page.toString()),
    });
  }
);

export const getCommentReplies = tryCatch<IComment[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const article_id = decodeURIComponent(req.params.article_id);
    const comment_id = req.params.comment_id;
    const page = req.query.page ?? '1';
    const pageSize = 10;
    const skipCount = (parseInt(page.toString()) - 1) * pageSize;

    if (comment_id === 'initial') {
      return res.status(200).json({
        success: true,
        payload: { results: [] },
        totalPages: 0,
        page: parseInt(page.toString()),
      });
    }

    const total = await collection.countDocuments({
      idArticle: article_id,
      parentCommentId: comment_id,
    });

    const result = await collection
      .find({ idArticle: article_id, parentCommentId: comment_id })
      .sort({ createdAt: 1 })
      .skip(skipCount)
      .limit(pageSize)
      .toArray();

    const formatResults = result.map((i) => ({ ...i, id: i._id }));

    console.log('formatResults', formatResults);

    return res.status(200).json({
      payload: { result: formatResults },
      success: true,
      totalPages: Math.ceil(total / pageSize),
      page: parseInt(page.toString()),
    });
  }
);

export const createComment = tryCatch(async (req: Request, res: Response) => {
  CommentSchema.parse(req.body);

  const parentId = req.body.parentCommentId === 'null';

  if (!collection) {
    throw new CustomError('Internal server error', 500);
  }

  await collection.insertOne({
    ...req.body,
    likes: parseInt(req.body.likes),
    parentCommentId: parentId ? null : parentId,
  });

  return res.status(200).json({ success: true });
});
