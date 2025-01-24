import { NextFunction, Request, Response } from 'express';

type SuccessResponse<T> = { success: boolean; payload: T };

type AsyncHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<SuccessResponse<T>, Record<string, any>>> | Promise<void>;

export const tryCatch = <T>(fn: AsyncHandler<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
