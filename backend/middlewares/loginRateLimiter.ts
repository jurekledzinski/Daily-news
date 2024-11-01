import { client } from '../config';
import { CustomError } from '../error';
import { IRateLimiterRes, RateLimiterMongo } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';
import {
  STATUS_CODE,
  IP_ATTEMPTS_LIMIT,
  LOGIN_ATTEMPTS_LIMIT,
} from '../constants';

const loginLimiter = new RateLimiterMongo({
  storeClient: client,
  points: LOGIN_ATTEMPTS_LIMIT,
  duration: 60,
  keyPrefix: 'login_limit',
  dbName: 'news',
});

const ipLimiter = new RateLimiterMongo({
  storeClient: client,
  points: IP_ATTEMPTS_LIMIT,
  duration: 86400,
  keyPrefix: 'ip_limit',
  dbName: 'news',
});

export const loginRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip!;
  const email = req.body.email;

  try {
    await ipLimiter.consume(ip);
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    let limiterError = error as IRateLimiterRes;

    if (
      limiterError &&
      limiterError.consumedPoints &&
      limiterError.consumedPoints > IP_ATTEMPTS_LIMIT
    ) {
      next({
        message: 'Too many attempts from this IP. Please try again later.',
        statusCode: STATUS_CODE.TOO_MANY_REQUESTS,
        success: false,
      });
    }
  }

  try {
    await loginLimiter.consume(`${email}_${ip}`);
    next();
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    let limiterError = error as IRateLimiterRes;

    if (
      limiterError &&
      limiterError.consumedPoints &&
      limiterError.consumedPoints > LOGIN_ATTEMPTS_LIMIT
    ) {
      next({
        message: 'Too many login attempts. Please try again later.',
        statusCode: STATUS_CODE.TOO_MANY_REQUESTS,
        success: false,
      });
    }
  }
};
