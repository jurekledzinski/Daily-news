import { ObjectId } from 'mongodb';
import { z } from 'zod';

const UserSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a text',
    })
    .min(1, { message: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email is invalid' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password required at least 8 characters' }),
});

type User = z.infer<typeof UserSchema>;

const loginUserSchema = UserSchema.pick({
  email: true,
  password: true,
});

const ChangeUserPasswordSchema = UserSchema.pick({ password: true });
const UpdateUserProfileSchema = UserSchema.pick({ name: true, email: true });

type UserLogin = z.infer<typeof loginUserSchema>;

type UserData = Omit<User, '_id'> & { _id: ObjectId | string };

export {
  ChangeUserPasswordSchema,
  loginUserSchema,
  UpdateUserProfileSchema,
  UserSchema,
  User,
  UserData,
  UserLogin,
};
