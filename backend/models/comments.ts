import { z } from 'zod';

export const CommentSchema = z.object({
  createdAt: z.date(),
  articleId: z.string(),
  text: z.string(),
  user: z.string(),
  userId: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;
