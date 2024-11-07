declare module 'express-session';

declare global {
  namespace Express {
    interface Request {
      session: session.Session;
    }
  }
}
