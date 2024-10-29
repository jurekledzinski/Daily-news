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

const LikesSchema = CommentSchema.pick({ likes: true });

type Comment = z.infer<typeof CommentSchema>;

interface IComment extends Comment {
  _id?: ObjectId;
}

export { CommentSchema, IComment, LikesSchema };
