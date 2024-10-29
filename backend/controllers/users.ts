import bcrypt from 'bcrypt';
import CustomError from '../error/error';
import { getCollectionDb } from '../config/db';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { requestLogout } from '../helpers';
import { STATUS_CODE } from '../constants';
import { tryCatch } from '../helpers/tryCatch';
import {
  ChangeUserPasswordSchema,
  UpdateUserProfileSchema,
  UserData,
} from '../models/user';

const collection = getCollectionDb<UserData>('users');

export const getUser = tryCatch<UserData[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    return res
      .status(STATUS_CODE.OK)
      .json({ success: true, payload: { result: req.user } });
  }
);

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!collection) {
    throw new CustomError(
      'Internal server error',
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }

  requestLogout(req, res, next);
};

export const updateUserProfile = tryCatch<UserData[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    UpdateUserProfileSchema.parse(req.body);

    const sessionUser = req.user! as UserData;

    const isExist =
      (await collection.findOne({ email: req.body.email })) !== null;

    if (isExist && sessionUser && sessionUser.email !== req.body.email) {
      throw new CustomError('User exist', STATUS_CODE.CONFLICT);
    }

    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body } }
    );

    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ success: true });
  }
);

export const changeUserPassword = tryCatch<UserData[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    const userData = ChangeUserPasswordSchema.parse(req.body);

    const salt = 10;
    const password = userData.password;

    const generatedSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { password: hashedPassword } }
    );

    return res.status(STATUS_CODE.OK).json({ success: true });
  }
);

export const deleteUser = tryCatch<UserData[]>(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    const id = req.params.id;

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount) {
      requestLogout(req, res, next);
    } else {
      res.status(STATUS_CODE.OK).json({ success: false });
    }
  }
);
