import { ActionData } from '@api';
import { Comment } from '@models';

export type UseCommentCallbacksProps = {
  action?: ActionData<Comment>;
};
