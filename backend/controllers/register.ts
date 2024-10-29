import bcrypt from 'bcrypt';
import CustomError from '../error/error';
import { getCollectionDb } from '../config/db';
import { Request, Response } from 'express';
import { STATUS_CODE } from '../constants';
import { tryCatch } from '../helpers/tryCatch';
import { User, UserSchema } from '../models/user';

export const registerUser = tryCatch(async (req: Request, res: Response) => {
  const collection = getCollectionDb<User>('users');

  if (!collection) {
    throw new CustomError(
      'Internal server error',
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }

  const user = await collection.findOne({ email: req.body.email });

  if (user) {
    throw new CustomError('User already exist', STATUS_CODE.CONFLICT);
  }

  const userData = UserSchema.parse(req.body);

  const salt = 10;
  const password = userData.password;

  const generatedSalt = await bcrypt.genSalt(salt);
  const hashedPassword = await bcrypt.hash(password, generatedSalt);

  const result = await collection.insertOne({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  if (!result.acknowledged) {
    throw new CustomError(
      'Internal server error',
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }

  return res.status(STATUS_CODE.OK).json({ success: true });
});
