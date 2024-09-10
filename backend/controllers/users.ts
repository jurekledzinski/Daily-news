import { Request, Response } from 'express';
// import { db } from '../config/db';
// import { ObjectId } from 'mongodb';
import { User, UserSchema } from '../models/user';
import { tryCatch } from '../helpers/tryCatch';
import { getCollectionDb } from '../config/db';
import CustomError from '../error/error';

// const userCollection = db.collection<User>('users');

const collection = getCollectionDb<User>('users');

export const getAllUsers = tryCatch<User[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const users = await collection.find({}).toArray();

    return res.status(200).json({ success: true, payload: users });
  }
);

export const createUser = tryCatch<User>(
  async (req: Request, res: Response) => {
    const parsedData = UserSchema.parse(req.body);

    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const result = await collection.insertOne(parsedData);

    return res.status(200).json({ status: 'success', payload: result });
  }
);
