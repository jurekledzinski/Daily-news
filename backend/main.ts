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
import { config } from './config';

import {
  commentRoutes,
  csrfRoutes,
  loginRoutes,
  registerRoutes,
  userRoutes,
} from './routes';

const domain = new URL(config.frontend_url!).hostname;

const app = express();
app.disable('x-powered-by');

const mongoStore = new MongoStore({
  mongoUrl: config.mongo_db_url_session,
  dbName: config.mongo_name_db_session,
});

app.use(morgan('dev'));
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: config.frontend_url,
    credentials: true,
  })
);

app.use(
  session({
    name: 'bmg-seqdk',
    secret: config.secret_key!,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
      domain,
      path: '/',
      secure: config.node_env === 'production',
      sameSite: 'none',
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
