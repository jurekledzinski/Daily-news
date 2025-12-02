import { RateLimiterRes } from 'rate-limiter-flexible';
import { NextFunction } from 'express';
import { STATUS_CODE } from '../constants';

type Params = {
  amountAttempts: number;
  limiter: () => Promise<RateLimiterRes>;
  message: string;
  next: NextFunction;
};

export const createLimiterResponse = async ({ amountAttempts, limiter, message, next }: Params) => {
  try {
    await limiter();
    if (message.includes('login')) next();
  } catch (error) {
    console.log('limiter response', error);

    if (error instanceof RateLimiterRes) {
      if ((error.consumedPoints ?? 0) > amountAttempts) {
        return next({
          message,
          statusCode: STATUS_CODE.TOO_MANY_REQUESTS,
          success: false,
        });
      }
    } else if (error instanceof Error) {
      return next({
        message: 'Internal Server Error',
        statusCode: STATUS_CODE.INTERNAL_ERROR,
        success: false,
      });
    }
  }
};
