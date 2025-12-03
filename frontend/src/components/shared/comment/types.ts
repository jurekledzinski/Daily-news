import { Comment } from '@/models';

export type CommentProps = {
  comment: Pick<Comment, 'createdAt' | 'text' | 'user'> & { id: string };
};
