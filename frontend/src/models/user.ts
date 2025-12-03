import * as z from 'zod';

export type CSRFToken = {
  csrfToken: string;
};

const UserSchema = z.object({
  email: z.email({ error: 'Email is invalid' }).min(1, { message: 'Email is required' }),
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  password: z.string(),
  csrfToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;
