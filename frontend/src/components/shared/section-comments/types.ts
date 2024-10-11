import { SubmitHandler } from 'react-hook-form';
import { IComment, ILikes } from '../../../api';

export interface CommentWithReplies extends IComment {
  pageReply?: number;
  totalReplyPages?: number;
  page?: number;
  totalPages?: number;
  replyCount?: number;
  replies?: IComment[];
}

export type SectionCommentsProps = {
  comments: CommentWithReplies[];
  children?: ((commentId: string) => React.ReactNode) | null;
  onShowReplies: (commendId: string) => void;
  onShowMoreReplies: (commendId: string, pageReply: number) => void;
  onShowPreviousReplies: (
    commendId: string,
    pageReply: number,
    totalReplyPages: number
  ) => void;
  onSubmitLike: (data: ILikes) => void;
};

export type HeaderProps = {
  commentId: string;
  likes: string;
  parentCommentId: string | null;
  user: string;
  onSubmitLike: SectionCommentsProps['onSubmitLike'];
};

export type CommentInput = {
  text: string;
};

export type FormProps = {
  buttonText: string;
  onSubmit: SubmitHandler<CommentInput>;
};

export type FooterProps = {
  amountReplies: number | undefined;
  onShowForm: () => void;
  onShowReplies?: () => void;
};

export type ContentProps = {
  text: string;
};

export type CommentSectionProps = Omit<SectionCommentsProps, 'comments'> & {
  comment: SectionCommentsProps['comments'][0];
  className?: string;
  children: ((commentId: string) => React.ReactNode) | null;
  onShowReplies: SectionCommentsProps['onShowReplies'];
  onShowMoreReplies: SectionCommentsProps['onShowMoreReplies'];
  onShowPreviousReplies: SectionCommentsProps['onShowPreviousReplies'];
  onSubmitLike: SectionCommentsProps['onSubmitLike'];
};

export type CommentPanelProps = {
  comment: SectionCommentsProps['comments'][0];
};
