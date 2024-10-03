import { SubmitHandler, UseFormReset } from 'react-hook-form';

export type Comment = {
  id: string;
  idArticle: string;
  userFrom: string;
  userFromId: string;
  userTo?: string;
  text: string;
  likes: number;
};

export interface CommentWithReplies extends Comment {
  replies?: Comment[];
}

export type SectionCommentsProps = {
  comments: CommentWithReplies[];
  onLikes: (commentId: string) => void;
  onReply: (commentId: string, text: string, userTo?: string) => void;
};

export type HeaderProps = {
  commentId: string;
  likes: number;
  userFrom: string;
  onLikes: SectionCommentsProps['onLikes'];
  userTo?: string;
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
