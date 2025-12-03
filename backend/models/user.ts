import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  surname: z.string().min(1, { message: 'Surname is required' }),
  email: z.email({ error: 'Email is invalid' }).min(1, { message: 'Email is required' }),
  password: z.string().min(8, { message: 'Password required at least 8 characters' }),
});

export type User = z.infer<typeof UserSchema>;
