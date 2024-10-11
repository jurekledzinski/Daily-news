import { LoaderFunctionArgs, Params } from 'react-router-dom';
import {
  APIGuardianResponseSuccess,
  ICategories,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIGuardianResponsePagniationSuccess,
  IComment,
  APIResponsePagniationSuccess,
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
  async (): Promise<APIGuardianResponseSuccess<ICategories[]>> => {
    const query = getCategoriesArticlesQuery();

    const result: APIGuardianResponseSuccess<ICategories[]> =
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query));

    if (result) {
      return result;
    } else {
      return {
        response: { results: [], status: 'failed', total: 0, userTier: '' },
      };
    }
  };

export const loaderArticles =
  (queryClient: QueryClient) =>
  async ({
    params,
    request,
  }: LoaderFunctionArgs): Promise<
    APIGuardianResponsePagniationSuccess<IArticles[]>
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
    comments: APIResponsePagniationSuccess<IComment[]>;
    commentReplies: APIResponsePagniationSuccess<IComment[]>;
  }> => {
    const { category, id } = params as Params;
    const articleId = decodeURIComponent(id ?? '');
    const url = new URL(request.url);
    const commentId = url.searchParams.get('comment_id') ?? 'initial';
    const page = url.searchParams.get('page') ?? '1';
    const pageReply = url.searchParams.get('page_reply') ?? '1';
    console.log('loader ----  articleId', articleId);
    console.log('loader ----  comment_id', commentId);
    console.log('loader ---- pageReply', pageReply);

    const query = getDetailsArticleQuery(category ?? '', articleId);

    const queryComments = getCommentsQuery(articleId, page);

    const queryCommentReplies = getCommentRepliesQuery(
      articleId,
      commentId,
      pageReply
    );

    const fetchOrCache = async <T>(
      queryKey: string[],
      queryFn: () => Promise<T>
    ) => {
      return (queryClient.getQueryData(queryKey) as T) ?? (await queryFn());
    };

    const detailsArticle = await fetchOrCache<
      APIResponseDetailsSuccess<IDetailsArticle>
    >(query.queryKey, () => queryClient.fetchQuery(query));

    const comments = await fetchOrCache<
      APIResponsePagniationSuccess<IComment[]>
    >(queryComments.queryKey, () => queryClient.fetchQuery(queryComments));

    const commentReplies = await fetchOrCache<
      APIResponsePagniationSuccess<IComment[]>
    >(queryCommentReplies.queryKey, () =>
      queryClient.fetchQuery(queryCommentReplies)
    );

    console.log('reslut commentReplies loader', commentReplies);

    return { detailsArticle, comments, commentReplies };
  };
