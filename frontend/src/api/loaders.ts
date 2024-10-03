import { LoaderFunctionArgs, Params } from 'react-router-dom';
import {
  APIResponseSuccess,
  ICategories,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIResponsePagniationSuccess,
  IComment,
} from './types';
import {
  getArticlesQuery,
  getCategoriesArticlesQuery,
  getDetailsArticleQuery,
  getCommentsQuery,
  getCommentRepliesQuery,
} from './queries';

import type { QueryClient } from '@tanstack/react-query';

export const loaderCategories =
  (queryClient: QueryClient) =>
  async (): Promise<APIResponseSuccess<ICategories[]>> => {
    const query = getCategoriesArticlesQuery();

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const loaderArticles =
  (queryClient: QueryClient) =>
  async ({
    params,
    request,
  }: LoaderFunctionArgs): Promise<
    APIResponsePagniationSuccess<IArticles[]>
  > => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';

    const { category } = params as Params;
    const query = getArticlesQuery(category ?? '', page);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const loaderDetailsArticle =
  (queryClient: QueryClient) =>
  async ({
    params,
    request,
  }: LoaderFunctionArgs): Promise<{
    detailsArticle: APIResponseDetailsSuccess<IDetailsArticle>;
    comments: { payload: { result: IComment[]; success: boolean } };
    commentReplies: unknown;
  }> => {
    const { category, id } = params as Params;
    const articleId = id ?? '';
    const url = new URL(request.url);
    const commentId = url.searchParams.get('comment_id') ?? 'initial';
    const page = url.searchParams.get('page') ?? '1';

    const query = getDetailsArticleQuery(category ?? '', articleId);
    const queryComments = getCommentsQuery(articleId, page);
    const queryCommentReplies = getCommentRepliesQuery(articleId, commentId);

    const [detailsArticle, comments, commentReplies] = await Promise.all<
      [
        APIResponseDetailsSuccess<IDetailsArticle>,
        { payload: { result: IComment[]; success: boolean } },
        { payload: unknown; success: boolean }
      ]
    >([
      queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query)),
      queryClient.getQueryData(queryComments.queryKey) ??
        (await queryClient.fetchQuery(queryComments)),
      queryClient.getQueryData(queryCommentReplies.queryKey) ??
        (await queryClient.fetchQuery(queryCommentReplies)),
    ]);

    return { detailsArticle, comments, commentReplies };
  };
