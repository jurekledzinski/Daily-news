import { ObjectId } from 'mongodb';

export const transformDocument = <T extends { _id: string | ObjectId }>(
  result: T[]
): (T & { id: ObjectId | string })[] => {
  if (!result || !result.length || !Array.isArray(result)) return [];

  return result.map((data) => {
    const { _id, ...rest } = data;

    const item = {
      ...rest,
      id: _id,
    };

    return item as T & { id: ObjectId | string };
  });
};
