import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import { commentRoutes, csrfRoutes, loginRoutes, registerRoutes, userRoutes } from './routes';
import { config } from './config';
import { logger } from './helpers';
import { z } from 'zod';
import type { CustomError } from './error';

const app = express();
app.disable('x-powered-by');

const mongoStore = new MongoStore({
  mongoUrl: config.mongo_db_url_session,
  dbName: config.mongo_name_db_session,
  collectionName: 'sessions',
  ttl: 60 * 60,
});

app.use(morgan('dev'));
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json());
app.use(
  cors({
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
      path: '/',
      secure: config.node_env === 'production',
      sameSite: config.node_env === 'production' ? 'none' : 'strict',
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
    rolling: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/token', csrfRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/register', registerRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comments', commentRoutes);

app.use((error: CustomError, _: Request, res: Response, next: NextFunction) => {
  logger.error('Base error middleware', error.message);
  if (error instanceof z.ZodError) {
    res.status(500).json({
      message: 'Incorrect data types',
      success: false,
    });
  } else {
    res.status(error.statusCode || 500).json({
      message: error.message,
      success: error.success,
    });
  }
});

export default app;
