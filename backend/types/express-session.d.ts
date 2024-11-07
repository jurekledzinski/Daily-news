import { Session } from 'express-session';

declare module 'express-session';

declare global {
  namespace Express {
    interface Request {
      session: Session;
    }
  }
}
