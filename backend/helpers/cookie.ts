import { Response } from 'express';

export const responseCookie = (res: Response, maxAge: number | undefined) => {
  res.cookie('time', 'true', {
    domain: process.env.NODE_ENV === 'production' ? '' : 'localhost', //add later domain after deploy frontend
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    sameSite: 'strict',
    maxAge: maxAge,
  });
};
