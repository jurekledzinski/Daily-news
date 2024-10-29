import { csrfSync } from 'csrf-sync';
import { Request, Response } from 'express';
import { STATUS_CODE } from '../constants';

const { generateToken, storeTokenInState } = csrfSync();

export const csrfController = (req: Request, res: Response) => {
  //   console.log('CSRF token ---- 1', req.session);
  //   if (!req.session.csrfToken) {
  //     req.session.csrfToken = generateToken(req);
  //   } else {
  //     // Regenerate token
  //     req.session.csrfToken = generateToken(req);
  //   }

  //   console.log('CSRF token ---- 2', req.session);

  //   return res.json({ token: req.session.csrfToken });

  //   if (!req.session.csrfToken) {
  //     req.session.csrfToken = generateToken(req);
  //   }

  //   console.log('kkkk', req.session.id);
  console.log('--- csrf session before send', req.session);

  return res.status(STATUS_CODE.OK).json({ token: generateToken(req, true) });
};
