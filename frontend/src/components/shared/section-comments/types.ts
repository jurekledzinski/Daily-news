import { CommentAndReplies, Likes } from '../../../api';
import { SubmitHandler } from 'react-hook-form';

export interface CommentsWithReplies extends CommentAndReplies {
  page?: number;
  totalPages?: number;
  replyCount?: number;
  replies: CommentAndReplies[];
}

export type SectionCommentsProps = {
  comments: CommentsWithReplies[];
  children?:
    | ((commentId: string, onClose: () => void) => React.ReactNode)
    | null;
  onShowReplies: (commendId: string) => void;
  onShowMoreReplies: (commendId: string, pageReply: number) => void;
  onSubmitLike: (data: Likes) => void;
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
  children: SectionCommentsProps['children'];
  onShowForm: () => void;
  onShowReplies?: () => void;
};

export type ContentProps = {
  text: string;
};

export type CommentSectionProps = Omit<SectionCommentsProps, 'comments'> & {
  comment: SectionCommentsProps['comments'][0];
  className?: string;
  children: SectionCommentsProps['children'];
  onShowReplies: SectionCommentsProps['onShowReplies'];
  onShowMoreReplies: SectionCommentsProps['onShowMoreReplies'];
  onSubmitLike: SectionCommentsProps['onSubmitLike'];
};

export type CommentPanelProps = {
  comment: SectionCommentsProps['comments'][0];
};
