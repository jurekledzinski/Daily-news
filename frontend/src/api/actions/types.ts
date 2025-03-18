import { QueryClient } from '@tanstack/react-query';

type Message = {
  message: string | undefined;
  action: string;
};

type PromiseRes = Promise<Response | Message>;

export type ActionCreateComment = (
  data: FormData,
  articleId: string,
  page: string
) => PromiseRes;

export type ActionCreateCommentReply = (
  data: FormData,
  articleId: string,
  page: string,
  pageReply: string
) => PromiseRes;

export type ActionUpdateLikesComment = (
  data: FormData,
  articleId: string,
  page: string,
  pageReply: string
) => PromiseRes;

export type ActionUpdateUserProfile = (
  data: FormData,
  id: string
) => PromiseRes;

export type ActionChangeUserPassword = (
  data: FormData,
  id: string
) => PromiseRes;

export type ActionDeleteUserAccount = (
  data: FormData,
  id: string
) => PromiseRes;

export type ActionRegisterUser = (data: FormData) => Promise<Response>;

export type ActionLoginUser = (
  queryClient: QueryClient,
  data: FormData
) => Promise<Response>;
