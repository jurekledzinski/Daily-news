require('dotenv').config();
import commentRoutes from './routes/comments';
import cors from 'cors';
import csrfRoutes from './routes/csrfRoute';
import CustomError from './error/error';
import express, { NextFunction, Request, Response } from 'express';
import loginRoutes from './routes/login';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import registerRoutes from './routes/register';
import session from 'express-session';
import userRoutes from './routes/users';
import { z } from 'zod';

const app = express();

const mongoStore = new MongoStore({
  mongoUrl: process.env.MONGO_DB_URL_SESSION,
  dbName: process.env.MONGO_NAME_DB_SESSION,
});

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  session({
    name: 'bmg-seqdk',
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
      domain: 'localhost', //change later production
      path: '/',
      secure: false, //change later production
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 1, //change later production
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// get routes
// crsfRoutes musza być za session

// use routes
app.use('/csrf-token', csrfRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/register', registerRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comments', commentRoutes);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.format();

      console.log('Error zod', formattedErrors);

      res.status(error.statusCode || 500).json({
        error: { message: formattedErrors, statusCode: error.statusCode },
      });
    } else {
      console.log('error normal', error.message);
      res.status(error.statusCode || 500).json({
        message: error.message,
        success: error.success,
      });
    }

    next();
  }
);

export default app;
