require('dotenv').config();
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import { CustomError } from './error';
import { z } from 'zod';
import logger from './helpers/logger';

import {
  commentRoutes,
  csrfRoutes,
  loginRoutes,
  registerRoutes,
  userRoutes,
} from './routes';

const domain = new URL(process.env.FRONTEND_URL!).hostname;

const app = express();
app.disable('x-powered-by');

const mongoStore = new MongoStore({
  mongoUrl: process.env.MONGO_DB_URL_SESSION,
  dbName: process.env.MONGO_NAME_DB_SESSION,
});

app.use(morgan('dev'));
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    name: 'bmg-seqdk',
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    store: mongoStore as session.Store,
    cookie: {
      domain,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 1,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/csrf-token', csrfRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/register', registerRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comments', commentRoutes);

app.use((error: CustomError, _: Request, res: Response, next: NextFunction) => {
  logger.error('Base error middleware', error.message);
  if (error instanceof z.ZodError) {
    res.status(error.statusCode || 500).json({
      error: { message: 'Incorrect data types', success: false },
    });
  } else {
    res.status(error.statusCode || 500).json({
      message: error.message,
      success: error.success,
    });
  }
  next();
});

export default app;
