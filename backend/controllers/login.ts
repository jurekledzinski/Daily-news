import { CustomError, throwError } from '../error';
import { NextFunction, Request, Response } from 'express';
import { passport } from '../middlewares/passport_config';
import { setEnableCookie } from '../helpers';
import { STATUS_CODE, STATUS_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import { User } from '../models';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  return new Promise<{ user: User; info: { message?: string } }>((resolve, reject) => {
    passport.authenticate('local', (error: Error, user: User, info: { message?: string }) => {
      if (error) {
        return reject(new CustomError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR));
      }

      if (!user) {
        return reject(new CustomError(`Authentication failed, ${info?.message ?? ''}`, STATUS_CODE.NOT_FOUND));
      }

      resolve({ user, info });
    })(req, res, next);
  });
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = await authenticateUser(req, res, next);

  req.login(user, (error) => {
    if (error) throwError('Login failed', STATUS_CODE.INTERNAL_ERROR);

    setEnableCookie(res, req.session?.cookie.maxAge!);

    return res.status(STATUS_CODE.OK).json({
      message: SUCCESS_MESSAGE['login'],
      payload: { email: user.email, id: user._id, name: user.name },
      success: true,
    });
  });
};
