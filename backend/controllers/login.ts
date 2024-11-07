import { CustomError } from '../error';
import { NextFunction, Request, Response } from 'express';
import { passport } from '../middlewares';
import { responseCookie } from '../helpers';
import { STATUS_CODE } from '../constants';
import { tryCatch } from '../helpers';
import { UserLogin } from '../models';

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

      const maxAge = req.session?.cookie.maxAge!;

      responseCookie(res, maxAge);

      return res.status(STATUS_CODE.OK).json({ success: true });
    });
  }
);
