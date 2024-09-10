import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { getCollectionDb } from '../config/db';
import CustomError from '../error/error';
import { ObjectId } from 'mongodb';
import { User } from '../models/user';

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
          throw new CustomError('Internal server error', 500);
        }

        const user = await collection.findOne<User>({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);

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
      throw new CustomError('Internal server error', 500);
    }

    const user = await collection.findOne<User>(
      { _id: new ObjectId(id) },
      { projection: { _id: 0, password: 0 } }
    );

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
