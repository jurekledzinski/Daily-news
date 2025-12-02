import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE, STATUS_MESSAGE } from '../constants';
import { throwError } from '../error';

export const checkAuthentication = (req: Request, _: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throwError(STATUS_MESSAGE[STATUS_CODE.UNAUTHORIZED], STATUS_CODE.UNAUTHORIZED);
};
