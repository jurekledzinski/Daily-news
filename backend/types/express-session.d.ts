declare module 'express-session' {
  interface SessionData {
    id?: string;
    email?: string;
    name?: string;
    isAuthenticated?: boolean;
  }
}

declare global {
  namespace Express {
    interface Request {
      session?: SessionData;
    }
  }
}
