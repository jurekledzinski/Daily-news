import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../constants';

export const requestLogout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err: Error) => {
    if (err) return next(err);

    req.session.destroy((err: Error) => {
      if (err) return next(err);

      res.clearCookie('time', {
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
