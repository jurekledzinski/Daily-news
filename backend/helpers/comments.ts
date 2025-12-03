import { Comment, DataDB } from '../models';
import { getCollectionDb } from '../config';

const collection = getCollectionDb<DataDB<Comment>>('comments');

export const commentAggergation = async (
  articleId: string,
  skipCount: number,
  pageSize: number
) => {
  const result = await collection
    .aggregate<DataDB<Comment>>([
      { $match: { articleId } },
      { $sort: { createdAt: -1 } },
      { $skip: skipCount },
      { $limit: pageSize },
    ])
    .toArray();

  return result;
};
