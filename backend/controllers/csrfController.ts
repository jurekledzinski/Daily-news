import { csrfSync } from 'csrf-sync';
import { Request, Response } from 'express';

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
//   console.log('---', req.session);

  return res.json({ token: generateToken(req, true) });
};
