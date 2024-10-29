import bcrypt from 'bcrypt';
import CustomError from '../error/error';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import xss from 'xss';
import { getCollectionDb } from '../config/db';
import { loginUserSchema, User } from '../models/user';
import { ObjectId } from 'mongodb';
import { STATUS_CODE } from '../constants';
import { transformDocument } from '../helpers/transformData';

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const parsedData = loginUserSchema.parse({ email, password });

      try {
        const collection = getCollectionDb('users');

        if (!collection) {
          throw new CustomError(
            'Internal server error',
            STATUS_CODE.INTERNAL_SERVER_ERROR
          );
        }

        const user = await collection.findOne<User>({
          email: xss(parsedData.email),
        });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isPasswordSame = await bcrypt.compare(
          xss(parsedData.password),
          user.password
        );

        if (isPasswordSame) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(
  (
    user: {
      _id?: string;
    },
    done
  ) => {
    done(null, user._id);
  }
);

passport.deserializeUser(async (id: string, done) => {
  try {
    const collection = getCollectionDb('users');

    if (!collection) {
      throw new CustomError(
        'Internal server error',
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    const user = await collection.findOne<User>(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return done(null, false);
    }

    const formatUser = transformDocument([
      { ...user, _id: new ObjectId(user._id) },
    ]);

    done(null, formatUser[0] ?? []);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
