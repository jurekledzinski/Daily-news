import { ArticleData, Likes } from '../../../api';
import { CommentInput, CommentsWithReplies } from '../../shared';
import { LegacyRef } from 'react';

export type ArticleDetailsProps = {
  comments: CommentsWithReplies[];
  data: ArticleData;
  headerRef: LegacyRef<HTMLDivElement> | undefined;
  methodSubmitComment: (data: CommentInput, commentId?: string) => void;
  methodSubmitLike: (data: Likes) => void;
  onShowReplies: (commendId: string) => void;
  onShowMoreReplies: (commendId: string, pageReply: number) => void;
};
