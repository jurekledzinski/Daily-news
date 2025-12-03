import bcrypt from 'bcrypt';
import xss from 'xss';
import { DataDB, User, UserSchema } from '../models';
import { getCollectionDb } from '../config';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { requestLogout } from '../helpers';
import { STATUS_CODE, STATUS_MESSAGE } from '../constants';
import { throwError } from '../error';

const collection = getCollectionDb<DataDB<User>>('users');

export const getUser = async (req: Request, res: Response) => {
  return res.status(STATUS_CODE.OK).json({ success: true, payload: req.user });
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  requestLogout(req, res, next);
};

export const updateUserProfile = async (req: Request, res: Response) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const parsedData = UserSchema.pick({ name: true, email: true }).parse(req.body);

  const sessionUser = req.user! as User;

  const isExist = (await collection.findOne({ email: req.body.email })) !== null;

  if (isExist && sessionUser && sessionUser.email !== req.body.email) {
    throwError('User exist', STATUS_CODE.CONFLICT);
  }

  await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { email: xss(parsedData.email), name: xss(parsedData.name) } }
  );

  return res.status(STATUS_CODE.OK).json({ success: true });
};

export const changeUserPassword = async (req: Request, res: Response) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const parsedData = UserSchema.pick({ password: true }).parse(req.body);

  const salt = 10;
  const password = xss(parsedData.password);

  const generatedSalt = await bcrypt.genSalt(salt);
  const hashedPassword = await bcrypt.hash(password, generatedSalt);

  await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { password: hashedPassword } });

  return res.status(STATUS_CODE.OK).json({ success: true });
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const id = req.params.id;

  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount) requestLogout(req, res, next);
  else res.status(STATUS_CODE.OK).json({ success: false });
};
