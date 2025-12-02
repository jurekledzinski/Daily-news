import bcrypt from 'bcrypt';
import xss from 'xss';
import { getCollectionDb } from '../config';
import { Request, Response } from 'express';
import { STATUS_CODE, STATUS_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import { throwError } from '../error';
import { User, UserSchema } from '../models';

export const registerUser = async (req: Request, res: Response) => {
  const collection = getCollectionDb<User>('users');

  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const user = await collection.findOne({ email: xss(req.body.email) });

  if (user) throwError('User already exist', STATUS_CODE.CONFLICT);

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
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  return res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGE['register'], success: true });
};
