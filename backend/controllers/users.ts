import { Request, Response } from 'express';
import { User, UserSchema } from '../models/user';
import { tryCatch } from '../helpers/tryCatch';
import { getCollectionDb } from '../config/db';
import CustomError from '../error/error';

const collection = getCollectionDb<User>('users');

export const getUser = tryCatch<User[]>(async (req: Request, res: Response) => {
  if (!collection) {
    throw new CustomError('Internal server error', 500);
  }

  return res.status(200).json({ success: true, payload: { result: req.user } });
});
