import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import xss from 'xss';
import { DataDB, User } from '../models';
import { formatDBDocumentId } from '../helpers';
import { getCollectionDb } from '../config';
import { ObjectId } from 'mongodb';
import { STATUS_CODE, STATUS_MESSAGE } from '../constants';
import { throwError } from '../error';

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
          throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
        }

        const user = await collection.findOne<DataDB<User>>({
          email: xss(email),
        });

        if (!user) {
          return done(null, false, {
            message: 'Login unsuccessful. Please check your credentials',
          });
        }

        const isPasswordSame = await bcrypt.compare(xss(password), user.password);

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
    const collection = getCollectionDb<DataDB<User>>('users');

    if (!collection) {
      throwError(STATUS_MESSAGE[STATUS_CODE.INTERNAL_ERROR], STATUS_CODE.INTERNAL_ERROR);
    }

    const user = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return done(null, false);
    }

    const formatUser = formatDBDocumentId(user);

    done(null, formatUser);
  } catch (error) {
    done(error, null);
  }
});

export { passport };
