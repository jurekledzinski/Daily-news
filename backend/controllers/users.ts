import bcrypt from 'bcrypt';
import xss from 'xss';
import { Comment, DataDB, User, UserSchema } from '../models';
import { formatDBDocumentId, requestLogout } from '../helpers';
import { getCollectionDb } from '../config';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { STATUS_CODE, STATUS_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import { throwError } from '../error';

const collection = getCollectionDb<DataDB<User>>('users');
const collectionComments = getCollectionDb<DataDB<Comment>>('comments');

export const getUser = async (req: Request, res: Response) => {
  return res.status(STATUS_CODE.OK).json({ success: true, payload: req.user });
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  requestLogout(req, res, next, 'logout');
};

export const updateUserProfile = async (req: Request, res: Response) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const parsedData = UserSchema.pick({ name: true, email: true }).parse(req.body);

  const sessionUser = req.user as User & { id: string };

  const existingUser = await collection.findOne({ email: parsedData.email });

  if (existingUser && existingUser._id.toString() !== sessionUser.id.toString()) {
    throwError('User already exists', STATUS_CODE.CONFLICT);
  }

  const updatedUser = await collection.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: { email: xss(parsedData.email), name: xss(parsedData.name) } },
    { returnDocument: 'after', projection: { email: true, _id: true, name: true, surname: true } }
  );

  if (!updatedUser) return throwError(STATUS_MESSAGE[STATUS_CODE.NOT_FOUND], STATUS_CODE.NOT_FOUND);

  const formatResults = formatDBDocumentId(updatedUser);

  return res
    .status(STATUS_CODE.OK)
    .json({ message: SUCCESS_MESSAGE['updateProfile'], payload: formatResults, success: true });
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

  return res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGE['updatePassword'], success: true });
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!collection) {
    throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
  }

  const id = req.params.id;

  if (!id) throwError(STATUS_MESSAGE[STATUS_CODE.UNAUTHORIZED], STATUS_CODE.UNAUTHORIZED);

  const resultUserDelete = await collection.deleteOne({ _id: new ObjectId(id) });
  await collectionComments.deleteMany({ userId: id });

  if (resultUserDelete.deletedCount === 1) return requestLogout(req, res, next, 'deleteUser');

  return res
    .status(STATUS_CODE.INTERNAL_ERROR)
    .json({ message: STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], success: false });
};
