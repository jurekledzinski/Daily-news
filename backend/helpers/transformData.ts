import { DataDB } from '../models';

export const formatDBDocumentId = <T extends DataDB<object>>(data: T[] | T) => {
  if (Array.isArray(data)) {
    return data.map<Omit<T, '_id'> & { id: string }>((item) => {
      const { _id, ...rest } = item;
      return { ...rest, id: _id?.toString() ?? '' };
    });
  } else {
    const { _id, ...rest } = data;
    return { ...rest, id: _id?.toString() ?? '' };
  }
};
