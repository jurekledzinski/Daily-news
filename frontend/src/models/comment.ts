import * as z from 'zod';

const CommentSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  idArticle: z.string(),
  likes: z.string(),
  parentCommentId: z.union([z.string(), z.null()]),
  replyCount: z.number(),
  text: z.string(),
  user: z.string(),
  userId: z.string(),
  csrfToken: z.string().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;

// Na chwile dla potrzeb refaktoru

const CommentAndReplies = CommentSchema.extend({
  pageReply: z.number(),
  totalReplyPages: z.number(),
  get replies() {
    return z.array(CommentAndReplies);
  },
});

export type CommentAndReplies = z.infer<typeof CommentAndReplies>;

const Likes = z.object({
  commentId: z.string(),
  likes: z.number(),
  parentCommentId: z.string(),
});

export type Likes = z.infer<typeof Likes>;
