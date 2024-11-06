import { ObjectId } from 'mongodb';

export const transformDocument = <T extends { _id?: ObjectId }>(
  result: T[]
): (T & { id?: ObjectId })[] => {
  if (!result || !result.length || !Array.isArray(result)) return [];

  return result.map((data) => {
    const { _id, ...rest } = data;

    const item = {
      ...rest,
      ...(_id && { id: _id }),
    };

    return item as T & { id?: ObjectId };
  });
};
