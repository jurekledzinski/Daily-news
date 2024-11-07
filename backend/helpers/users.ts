import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../constants';
import { CustomError } from '../error';

export const requestLogout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err: Error) => {
    if (err) return next(err);
    if (!req.session) {
      throw new CustomError('SERVER ERROR', STATUS_CODE.NOT_FOUND);
    }

    req.session.destroy((err: Error) => {
      if (err) return next(err);

      res.clearCookie('tsge', {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.clearCookie('bmg-seqdk', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(STATUS_CODE.OK).json({ success: true });
    });
  });
};
