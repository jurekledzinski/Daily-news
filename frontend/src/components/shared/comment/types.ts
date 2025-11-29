import { Comment } from '@/models';

export type CommentProps = {
  comment: Pick<Comment, 'createdAt' | 'likes' | 'text' | 'user'>;
};
