import CustomError from '../error/error';
import passport from '../middlewares/passport_config';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../constants';
import { tryCatch } from '../helpers/tryCatch';
import { UserLogin } from '../models/user';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  return new Promise<{ user: UserLogin; info: { message?: string } }>(
    (resolve, reject) => {
      passport.authenticate(
        'local',
        (error: Error, user: UserLogin, info: { message?: string }) => {
          if (error) {
            return reject(
              new CustomError(
                'Internal server error',
                STATUS_CODE.INTERNAL_SERVER_ERROR
              )
            );
          }
          if (!user) {
            return reject(
              new CustomError(
                `Authentication failed, ${info.message}`,
                STATUS_CODE.NOT_FOUND
              )
            );
          }
          resolve({ user, info });
        }
      )(req, res, next);
    }
  );
};

export const loginUser = tryCatch<{ message: '' }>(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = await authenticateUser(req, res, next);

    req.login(user, (error) => {
      if (error) {
        throw new CustomError(
          'Login failed',
          STATUS_CODE.INTERNAL_SERVER_ERROR
        );
      }

      const maxAge = req.session.cookie.maxAge;

      res.cookie('time', 'true', {
        domain: process.env.NODE_ENV === 'production' ? '' : 'localhost', //add later domain after deploy frontend
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
        sameSite: 'strict',
        maxAge: maxAge,
      });

      return res.status(STATUS_CODE.OK).json({ success: true });
    });
  }
);
