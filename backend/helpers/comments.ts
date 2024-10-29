import { getCollectionDb } from '../config/db';
import { PAGE_SIZE } from '../constants';
import { IComment } from '../models/comments';

export const calculateSkipCount = (
  page: string | string[] | qs.ParsedQs | qs.ParsedQs[]
) => {
  return (parseInt(page.toString()) - 1) * PAGE_SIZE;
};

const collection = getCollectionDb<IComment>('comments');

export const commentAggergation = async (
  idArticle: string,
  parentCommentId: string | null,
  skipCount: number,
  pageSize: number
) => {
  const result = await collection
    .aggregate<IComment>([
      { $match: { idArticle, parentCommentId } },
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

  return result;
};

export const buildResponse = <T>(
  result: T,
  page: string | string[] | qs.ParsedQs | qs.ParsedQs[],
  totalPages: number
) => ({
  payload: { result },
  success: true,
  totalPages: totalPages ? totalPages : 1,
  page: parseInt(page.toString()),
});
