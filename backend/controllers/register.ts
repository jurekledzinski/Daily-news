import { Request, Response } from 'express';
import { tryCatch } from '../helpers/tryCatch';
import bcrypt from 'bcrypt';
import { getCollectionDb } from '../config/db';
import CustomError from '../error/error';

import { UserSchema, User } from '../models/user';

export const registerUser = tryCatch(async (req: Request, res: Response) => {
  const collection = getCollectionDb<User>('users');

  if (!collection) {
    throw new CustomError('Internal server error', 500);
  }

  const user = await collection.findOne({ email: req.body.email });

  if (user) {
    throw new CustomError('User already exist', 409);
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
    throw new CustomError('Internal server error', 500);
  }

  return res.status(200).json({ success: true });
});
