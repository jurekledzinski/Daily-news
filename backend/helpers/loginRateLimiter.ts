import { CustomError } from '../error';
import { IRateLimiterRes, RateLimiterRes } from 'rate-limiter-flexible';
import { NextFunction } from 'express';
import { STATUS_CODE } from '../constants';

export const buildResponseRateLimiter = async (
  limiter: () => Promise<RateLimiterRes>,
  limit: number,
  message: string,
  next: NextFunction,
  type: 'ip' | 'login'
) => {
  try {
    await limiter();
    type === 'login' ? next() : null;
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    const limiterError = error as IRateLimiterRes;

    if (
      limiterError &&
      limiterError.consumedPoints &&
      limiterError.consumedPoints > limit
    ) {
      return next({
        message,
        statusCode: STATUS_CODE.TOO_MANY_REQUESTS,
        success: false,
      });
    }

    throw new CustomError(
      'Unexpected error',
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }
};
