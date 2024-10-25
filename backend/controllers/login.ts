import { Request, Response, NextFunction } from 'express';
import { tryCatch } from '../helpers/tryCatch';
import passport from '../middlewares/passport_config';
import CustomError from '../error/error';
import { UserLogin } from '../models/user';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  return new Promise<{ user: UserLogin; info: { message?: string } }>(
    (resolve, reject) => {
      passport.authenticate(
        'local',
        (error: Error, user: UserLogin, info: { message?: string }) => {
          if (error) {
            return reject(new CustomError('Internal server error', 500));
          }
          if (!user) {
            return reject(
              new CustomError(`Authentication failed, ${info.message}`, 404)
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
        throw new CustomError('Login failed', 500);
      }

      const maxAge = req.session.cookie.maxAge;

      res.cookie('time', 'true', {
        domain: 'localhost', //change later
        path: '/',
        secure: false, //change later
        httpOnly: false,
        sameSite: 'strict',
        maxAge: maxAge,
      });

      return res.status(200).json({ success: true });
    });
  }
);
