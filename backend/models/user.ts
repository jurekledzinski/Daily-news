import { ObjectId } from 'mongodb';
import { z } from 'zod';

const UserSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Email is invalid' }).min(1, { message: 'Email is required' }),
  password: z.string().min(8, { message: 'Password required at least 8 characters' }),
});

type User = z.infer<typeof UserSchema>;

const ChangeUserPasswordSchema = UserSchema.pick({ password: true });
const UpdateUserProfileSchema = UserSchema.pick({ name: true, email: true });

type UserData = Omit<User, '_id'> & { _id: ObjectId | string };

export { ChangeUserPasswordSchema, UpdateUserProfileSchema, UserSchema, User, UserData };
