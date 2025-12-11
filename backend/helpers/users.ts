import { clearEnableCookie } from './cookies';
import { config } from '../config';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE, STATUS_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import { throwError } from '../error';

export const requestLogout = (req: Request, res: Response, next: NextFunction, key: 'deleteUser' | 'logout') => {
  req.logout((err: Error) => {
    if (err) return next(err);
    if (!req.session) throwError(STATUS_MESSAGE[STATUS_CODE.NOT_FOUND], STATUS_CODE.NOT_FOUND);

    clearEnableCookie(res);

    req.session.destroy((err: Error) => {
      if (err) return next(err);

      res.clearCookie('bmg-seqdk', {
        path: '/',
        httpOnly: true,
        secure: config.node_env === 'production',
        sameSite: config.node_env === 'production' ? 'none' : 'strict',
      });

      return res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGE[key], success: true });
    });
  });
};
