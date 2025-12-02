import { client } from '../config';
import { createLimiterResponse } from '../helpers';
import { IP_ATTEMPTS_LIMIT, LOGIN_ATTEMPTS_LIMIT } from '../constants';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';

let loginLimiter: RateLimiterMongo;
let ipLimiter: RateLimiterMongo;

export const connectRateLimiters = async () => {
  loginLimiter = new RateLimiterMongo({
    storeClient: client,
    points: LOGIN_ATTEMPTS_LIMIT,
    duration: 60,
    keyPrefix: 'login_limit',
    dbName: 'news',
  });

  ipLimiter = new RateLimiterMongo({
    storeClient: client,
    points: IP_ATTEMPTS_LIMIT,
    duration: 86400,
    keyPrefix: 'ip_limit',
    dbName: 'news',
  });
};

export const loginRateLimiter = async (req: Request, _: Response, next: NextFunction) => {
  const ip = req.ip!;
  const email = req.body.email;

  if (!loginLimiter || !ipLimiter) {
    throw new Error('Rate limiters not initialized');
  }

  await createLimiterResponse({
    amountAttempts: IP_ATTEMPTS_LIMIT,
    message: 'Too many attempts from this IP. Please try again later.',
    limiter: () => ipLimiter.consume(ip),
    next,
  });

  await createLimiterResponse({
    amountAttempts: LOGIN_ATTEMPTS_LIMIT,
    message: 'Too many login attempts. Please try again later.',
    limiter: () => loginLimiter.consume(email + '_' + ip),
    next,
  });
};
