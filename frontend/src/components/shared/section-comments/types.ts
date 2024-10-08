import { SubmitHandler } from 'react-hook-form';
import { IComment } from '../../../api';

export type Comment = {
  id: string;
  idArticle: string;
  user: string;
  userId: string;
  userTo?: string;
  text: string;
  likes: number;
};

export interface CommentWithReplies extends IComment {
  replies?: IComment[];
}

export type SectionCommentsProps = {
  comments: CommentWithReplies[];
  onLikes: (commentId: string) => void;
  onReply: (commentId: string, text: string, userTo?: string) => void;
};

export type HeaderProps = {
  commentId: string;
  likes: number;
  user: string;
  onLikes: SectionCommentsProps['onLikes'];
};

export type CommentInput = {
  text: string;
  //   reset: UseFormReset<CommentInput>;
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
};

export type CommentPanelProps = {
  comment: SectionCommentsProps['comments'][0];
  onLikes: SectionCommentsProps['onLikes'];
  onReply: SectionCommentsProps['onReply'];
  onShowReplies?: () => void;
  onShowRepliesOnSubmit?: () => void;
};
