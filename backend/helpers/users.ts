import { config } from '../config';
import { CustomError } from '../error';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../constants';

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
        httpOnly: false,
        secure: config.node_env === 'production',
        sameSite: config.node_env === 'production' ? 'none' : 'strict',
      });
      res.clearCookie('bmg-seqdk', {
        path: '/',
        httpOnly: true,
        secure: config.node_env === 'production',
        sameSite: config.node_env === 'production' ? 'none' : 'strict',
      });

      return res.status(STATUS_CODE.OK).json({ success: true });
    });
  });
};
