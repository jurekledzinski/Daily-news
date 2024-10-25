import bcrypt from 'bcrypt';
import CustomError from '../error/error';
import { getCollectionDb } from '../config/db';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
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
      throw new CustomError('Internal server error', 500);
    }

    return res
      .status(200)
      .json({ success: true, payload: { result: req.user } });
  }
);

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!collection) {
    throw new CustomError('Internal server error', 500);
  }

  req.logout((err: Error) => {
    if (err) return next(err);

    req.session.destroy((err: Error) => {
      if (err) return next(err);

      res.clearCookie('time', { path: '/' });
      res.clearCookie('bmg-seqdk', { path: '/' });

      return res.status(200).json({ success: true });
    });
  });
};

export const updateUserProfile = tryCatch<UserData[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    UpdateUserProfileSchema.parse(req.body);

    const isExist =
      (await collection.findOne({ email: req.body.email })) !== null;

    console.log('isExist', isExist);

    if (isExist) {
      throw new CustomError('User with this email already exist', 409);
    }

    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body } }
    );

    return res.status(200).json({ success: true });
  }
);

export const changeUserPassword = tryCatch<UserData[]>(
  async (req: Request, res: Response) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
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

    return res.status(200).json({ success: true });
  }
);

export const deleteUser = tryCatch<UserData[]>(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!collection) {
      throw new CustomError('Internal server error', 500);
    }

    const id = req.params.id;

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount) {
      req.logout((err: Error) => {
        if (err) return next(err);

        req.session.destroy((err: Error) => {
          if (err) return next(err);

          res.clearCookie('time', { path: '/' });
          res.clearCookie('bmg-seqdk', { path: '/' });

          return res.status(200).json({ success: true });
        });
      });
    } else {
      res.status(200).json({ success: false });
    }
  }
);
