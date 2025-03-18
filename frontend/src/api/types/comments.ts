import { CSRFToken } from './user';

export type Comment = {
  createdAt: string;
  id: string;
  idArticle: string;
  likes: string;
  parentCommentId: string | null;
  replyCount?: number;
  text: string;
  user: string;
  userId: string;
};

export type CommentCreate = Omit<Comment, 'id'> & CSRFToken;

export interface CommentAndReplies extends Comment {
  pageReply?: number;
  totalReplyPages?: number;
  replies: CommentAndReplies[];
}

export interface Likes extends Pick<Comment, 'parentCommentId'> {
  commentId: string;
  likes: number;
}
