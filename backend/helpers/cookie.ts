import { Response } from 'express';

export const responseCookie = (res: Response, maxAge: number | undefined) => {
  const domain = new URL(process.env.FRONTEND_URL!).hostname;

  res.cookie('tsge', 'true', {
    domain,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    sameSite: 'strict',
    maxAge: maxAge,
  });
};
