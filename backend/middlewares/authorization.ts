import { Request, Response, NextFunction } from 'express';
import CustomError from '../error/error';

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new CustomError('Not authenticated', 401);
};
