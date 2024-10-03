import { ObjectId } from 'mongodb';
import { z } from 'zod';

const CommentSchema = z.object({
  createdAt: z.string(),
  idArticle: z.string(),
  likes: z.number(),
  parentCommentId: z.string().nullable(),
  text: z.string(),
  user: z.string(),
  userId: z.string(),
});

type Comment = z.infer<typeof CommentSchema>;

type IComment = Omit<Comment, '_id'> & { _id: ObjectId | string };

export { CommentSchema, IComment };
