import { Comment } from '@/models';

export type CommentFormValues = Pick<Comment, 'text' | 'user'>;

export type UseCommentFormProps = {
  articleId: string;
  onSuccess: () => void;
  status: 'idle' | 'loading' | 'submitting';
  userId: string;
};
