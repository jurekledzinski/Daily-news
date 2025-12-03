import { ActionData } from '@api';
import { Comment } from '@models';
import { Navigation } from 'react-router';

export type CommentFormValues = Pick<Comment, 'text' | 'user'>;

export type UseCommentFormProps = {
  articleId: string;
  onFailed: () => void;
  onSuccess: () => void;
  status: Navigation;
  action?: ActionData;
  token?: string;
  userId?: string;
};
