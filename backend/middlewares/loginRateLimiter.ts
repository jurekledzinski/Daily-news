import { buildResponseRateLimiter } from '../helpers';
import { client } from '../config';
import { IP_ATTEMPTS_LIMIT, LOGIN_ATTEMPTS_LIMIT } from '../constants';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';

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
  _: Response,
  next: NextFunction
) => {
  const ip = req.ip!;
  const email = req.body.email;

  await buildResponseRateLimiter(
    () => ipLimiter.consume(ip),
    IP_ATTEMPTS_LIMIT,
    'Too many attempts from this IP. Please try again later.',
    next,
    'ip'
  );

  await buildResponseRateLimiter(
    () => loginLimiter.consume(`${email}_${ip}`),
    LOGIN_ATTEMPTS_LIMIT,
    'Too many login attempts. Please try again later.',
    next,
    'login'
  );
};
