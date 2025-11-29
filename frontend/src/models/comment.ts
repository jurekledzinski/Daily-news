import * as z from 'zod';

const CommentSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  articleId: z.string(),
  likes: z.number(),
  text: z.string(),
  user: z.string(),
  userId: z.string(),
  csrfToken: z.string().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
