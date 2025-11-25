import * as z from 'zod';

export type CSRFToken = {
  csrfToken: string;
};

const UserSchema = z.object({
  email: z.string(),
  id: z.string(),
  name: z.string(),
  password: z.string(),
  csrfToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;
