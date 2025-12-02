import { config } from '../config';
import { CookieOptions, Response } from 'express';

const options: CookieOptions = {
  path: '/',
  secure: config.node_env === 'production',
  httpOnly: false,
  sameSite: config.node_env === 'production' ? 'none' : 'strict',
};

export const setEnableCookie = (res: Response, maxAge: number | undefined) => {
  res.cookie('enable', 'true', { ...options, maxAge });
};

export const clearEnableCookie = (res: Response) => {
  res.clearCookie('enable', options);
};
