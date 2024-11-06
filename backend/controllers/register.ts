import bcrypt from 'bcrypt';
import CustomError from '../error/error';
import xss from 'xss';
import { getCollectionDb } from '../config';
import { Request, Response } from 'express';
import { STATUS_CODE } from '../constants';
import { tryCatch } from '../helpers';
import { User, UserSchema } from '../models';

export const registerUser = tryCatch(async (req: Request, res: Response) => {
  const collection = getCollectionDb<User>('users');

  if (!collection) {
    throw new CustomError(
      'Internal server error',
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }

  const user = await collection.findOne({ email: xss(req.body.email) });

  if (user) {
    throw new CustomError('User already exist', STATUS_CODE.CONFLICT);
  }

  const parsedData = UserSchema.parse(req.body);

  const salt = 10;
  const password = xss(parsedData.password);

  const generatedSalt = await bcrypt.genSalt(salt);
  const hashedPassword = await bcrypt.hash(password, generatedSalt);

  const result = await collection.insertOne({
    name: xss(parsedData.name),
    email: xss(parsedData.email),
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
