import { ObjectId, WithId } from "mongodb";
import { IComment } from "../models/comments";

export const transformDocument = <T extends WithId<IComment>(
  result: T[]
): (T & { id: ObjectId | string })[] => {
  if (!result || !Array.isArray(result)) return [];

  return result.map((comment) => {
    const { _id, ...rest } = comment;

    const item = {
      ...rest,
      id: _id,
    };

    return item as T & { id: ObjectId | string };
  });
}
