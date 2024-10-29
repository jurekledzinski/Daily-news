import CustomError from '../error/error';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../constants';

export const checkAuthentication = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new CustomError('Not authenticated', STATUS_CODE.UNAUTHORIZED);
};
