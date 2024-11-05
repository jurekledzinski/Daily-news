import { ArticleData, Likes } from '../../../../api';
import { CommentInput, CommentsWithReplies } from '../../../shared';
import { UserState } from '../../../../store';
import { ActionData } from '../../../../types';

export type ArticleDetailsProps = {
  actionData: ActionData;
  comments: CommentsWithReplies[];
  data: ArticleData;
  methodSubmitComment: (data: CommentInput, commentId?: string) => void;
  methodSubmitLike: (data: Likes) => void;
  onShowReplies: (commendId: string) => void;
  onShowMoreReplies: (commendId: string, pageReply: number) => void;
  successComments: boolean;
  successRepliesComments: boolean;
  userData: UserState;
};
