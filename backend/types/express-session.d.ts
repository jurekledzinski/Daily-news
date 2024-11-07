import type { CookieOptions } from 'express-session';

declare global {
  namespace Express {
    interface Request {
      session: {
        id?: string;
        email?: string;
        cookie: CookieOptions;
      };
    }
  }
}
