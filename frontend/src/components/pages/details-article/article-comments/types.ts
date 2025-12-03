import { ActionData } from '@api';
import { Comment } from '@models';

export type ArticleCommentsProps = {
  articleId: string;
  token: string;
  action?: ActionData<Comment>;
};
