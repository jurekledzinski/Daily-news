import 'express';
import type session from 'express-session';

declare global {
  namespace Express {
    interface Request {
      session;
    }
  }
}
