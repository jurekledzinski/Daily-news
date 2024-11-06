import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import xss from 'xss';
import { CustomError } from '../error';
import { getCollectionDb } from '../config';
import { User } from '../models';
import { ObjectId } from 'mongodb';
import { STATUS_CODE } from '../constants';
import { transformDocument } from '../helpers';

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const collection = getCollectionDb('users');

        if (!collection) {
          throw new CustomError(
            'Internal server error',
            STATUS_CODE.INTERNAL_SERVER_ERROR
          );
        }

        const user = await collection.findOne<User>({
          email: xss(email),
        });

        if (!user) {
          return done(null, false, {
            message: 'Login unsuccessful. Please check your credentials',
          });
        }

        const isPasswordSame = await bcrypt.compare(
          xss(password),
          user.password
        );

        if (isPasswordSame) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect email or password' });
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
