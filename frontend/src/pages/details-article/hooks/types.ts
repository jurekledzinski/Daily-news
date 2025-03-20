import { APIResPagination, Comment, CommentAndReplies, Likes } from '@/api';
import { CommentsWithReplies } from '@/components/shared';

export type UseAddCommentProps = {
  artId: string | undefined;
  user: string;
  userId: string;
  token: string;
};

export type UseLoadCommentsProps = {
  dataComments: APIResPagination<Comment[]> | undefined;
  dataCommentReplies: APIResPagination<CommentAndReplies[]> | undefined;
  articleId: string | undefined;
  setStateComments: React.Dispatch<
    React.SetStateAction<Record<string, CommentsWithReplies[]>>
  >;
};

export type UseUpdateLikesProps = {
  onLikes: (data: Likes) => void;
};
