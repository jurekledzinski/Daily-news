import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import xss from 'xss';
import { tryCatch } from '../helpers/tryCatch';
import { IPost, PostSchema } from '../models/post';
import { getCollectionDb } from '../config/db';
import CustomError from '../error/error';

const collection = getCollectionDb<IPost>('posts');

export const getAllPosts = tryCatch<IPost[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const result = await collection.find({}).toArray();

    return res.status(200).json({ success: true, payload: result });
  }
);

export const createPost = tryCatch<IPost[]>(
  async (req: Request, res: Response) => {
    const parsedData = PostSchema.parse(req.body);

    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    // To dla testów bez xss sanitaze
    // const result = await collection.insertOne(parsedData);

    const result = await collection.insertOne({
      title: xss(parsedData.title),
      description: xss(parsedData.description),
    });

    return res.status(200).json({ success: true, payload: result });
  }
);

export const updatePost = tryCatch<IPost[]>(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const parsedData = PostSchema.parse(req.body);

    console.log('ID params', id);

    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const result = await collection.updateOne({ _id: id }, parsedData);

    return res.status(200).json({ success: true, payload: result });
  }
);

export const deletePost = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;

  PostSchema.shape._id.parse(id);

  const objectId = new ObjectId(id);

  if (!collection) {
    throw new CustomError('Internal server error', 500);
  }

  const result = await collection.deleteOne({
    _id: objectId,
  });

  return res
    .status(200)
    .json({ success: result.deletedCount ? true : false, payload: result });
});
