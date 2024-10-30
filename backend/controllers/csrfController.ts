import { csrfSync } from 'csrf-sync';
import { Request, Response } from 'express';
import { STATUS_CODE } from '../constants';

const { generateToken } = csrfSync();

export const csrfController = (req: Request, res: Response) => {
  return res.status(STATUS_CODE.OK).json({ token: generateToken(req, true) });
};
