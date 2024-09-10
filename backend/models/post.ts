import { ObjectId } from 'mongodb';
import { z } from 'zod';

const PostSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
});

type Post = z.infer<typeof PostSchema>;

type IPost = Omit<Post, '_id'> & { _id?: ObjectId | string };

export { PostSchema, IPost };
