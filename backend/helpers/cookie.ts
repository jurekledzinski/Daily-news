import { Response } from 'express';
import { config } from '../config';

export const responseCookie = (res: Response, maxAge: number | undefined) => {
  const domain = new URL(config.frontend_url!).hostname;

  res.cookie('tsge', 'true', {
    domain,
    path: '/',
    secure: config.node_env === 'production',
    httpOnly: false,
    sameSite: 'none',
    maxAge: maxAge,
  });
};
