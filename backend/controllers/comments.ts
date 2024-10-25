import CustomError from '../error/error';
import { CommentSchema, IComment } from '../models/comments';
import { getCollectionDb } from '../config/db';
import { Request, Response } from 'express';
import { transformDocument } from '../helpers/transformData';
import { tryCatch } from '../helpers/tryCatch';
import { ObjectId, WithId } from 'mongodb';

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
      .aggregate<IComment>([
        { $match: { idArticle: article_id, parentCommentId: null } },
        {
          $lookup: {
            from: 'comments',
            let: { topCommentId: { $toString: '$_id' } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$parentCommentId', '$$topCommentId'] },
                },
              },
            ],
            as: 'replies',
          },
        },
        {
          $addFields: {
            replyCount: { $size: '$replies' },
          },
        },
        { $project: { replies: 0 } },
        { $sort: { createdAt: -1 } },
        { $skip: skipCount },
        { $limit: pageSize },
      ])
      .toArray();

    const formatResults = transformDocument<WithId<IComment>>(result);

    const totalPages = Math.ceil(total / pageSize);

    return res.status(200).json({
      payload: { result: formatResults },
      success: true,
      totalPages: totalPages ? totalPages : 1,
      page: parseInt(page.toString()),
    });
  }
);

export const getCommentReplies = tryCatch<IComment[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    console.log('req.query get replies', req.query);

    const article_id = decodeURIComponent(req.params.article_id);
    const comment_id = req.params.comment_id;
    const page = req.query.page_reply ?? '1';
    const pageSize = 10;
    const skipCount = (parseInt(page.toString()) - 1) * pageSize;

    const total = await collection.countDocuments({
      idArticle: article_id,
      parentCommentId: comment_id,
    });

    const result = await collection
      .aggregate<IComment>([
        { $match: { idArticle: article_id, parentCommentId: comment_id } },
        {
          $lookup: {
            from: 'comments',
            let: { topCommentId: { $toString: '$_id' } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$parentCommentId', '$$topCommentId'] },
                },
              },
            ],
            as: 'replies',
          },
        },
        {
          $addFields: {
            replyCount: { $size: '$replies' },
          },
        },
        { $project: { replies: 0 } },
        { $sort: { createdAt: -1 } },
        { $skip: skipCount },
        { $limit: pageSize },
      ])
      .toArray();

    const formatResults = transformDocument<WithId<IComment>>(result);

    const totalPages = Math.ceil(total / pageSize);

    return res.status(200).json({
      payload: { result: formatResults },
      success: true,
      totalPages: totalPages ? totalPages : 1,
      page: parseInt(page.toString()),
      replyCount: total,
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
    parentCommentId: parentId ? null : req.body.parentCommentId,
  });

  return res.status(200).json({ success: true });
});

export const updateCommentLikes = tryCatch(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const articleId = decodeURIComponent(req.params.article_id);
    const commentId = req.params.comment_id;

    await collection.updateOne(
      {
        _id: new ObjectId(commentId),
        idArticle: articleId,
      },
      { $inc: req.body }
    );

    return res.status(200).json({ success: true });
  }
);
