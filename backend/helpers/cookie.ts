import { Response } from 'express';
import { config } from '../config';

export const responseCookie = (res: Response, maxAge: number | undefined) => {
  res.cookie('tsge', 'true', {
    path: '/',
    secure: config.node_env === 'production',
    httpOnly: false,
    sameSite: config.node_env === 'production' ? 'none' : 'strict',
    maxAge: maxAge,
  });
};
