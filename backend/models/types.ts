import { ObjectId } from 'mongodb';

export type DataDB<T> = T & {
  _id?: ObjectId;
};
