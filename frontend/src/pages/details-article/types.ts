import { ActionData } from '@/types';
import { CommentsWithReplies } from '@/components/shared';
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import {
  APIGuardianResDetailsSuccess,
  APIResPagination,
  ArticleDetails,
  Comment,
  CommentAndReplies,
  loaderDetailsArticle,
} from '@/api';

export type StateComments = Record<string, CommentsWithReplies[]>;

export type LoaderData = Awaited<
  ReturnType<ReturnType<typeof loaderDetailsArticle>>
>;

export type DetailsArticleProps = {
  articleId: string;
  actionData: ActionData;
  comments: UseQueryResult<APIResPagination<Comment[]>, Error>;
  commentsReplies: UseQueryResult<APIResPagination<CommentAndReplies[]>, Error>;
  loaderData: APIGuardianResDetailsSuccess<ArticleDetails> | null;
  token: string;
  onSetSearchParams: (
    value: URLSearchParams | URLSearchParamsInit,
    options?: NavigateOptions
  ) => void;
  onShowReplies: (commendId: string) => void;
  onShowMoreReplies: (commendId: string, pageReply: number) => void;
  searchParams: URLSearchParams;
};
