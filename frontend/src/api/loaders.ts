import { fetchOrCache } from '../helpers';
import { LoaderFunctionArgs, Params } from 'react-router-dom';
import {
  APIGuardianResponseSuccess,
  CategoriesData,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIGuardianResponsePagniationSuccess,
  Comment,
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
  async (): Promise<APIGuardianResponseSuccess<CategoriesData[]>> => {
    const query = getCategoriesArticlesQuery();

    const categories: APIGuardianResponseSuccess<CategoriesData[]> =
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query));

    return categories ? categories : categories;
  };

export const loaderArticles =
  (queryClient: QueryClient) =>
  async ({
    params,
    request,
  }: LoaderFunctionArgs): Promise<
    APIGuardianResponsePagniationSuccess<IArticles[]>
  > => {
    const { category } = params as Params;
    const page = getUrlQuery(request, 'page', '1');

    const query = getArticlesQuery(category ?? 'about', page);

    const articles: APIGuardianResponsePagniationSuccess<IArticles[]> =
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query));

    return articles;
  };

export const loaderDetailsArticle =
  (queryClient: QueryClient) =>
  async ({
    params,
    request,
  }: LoaderFunctionArgs): Promise<{
    detailsArticle: APIResponseDetailsSuccess<IDetailsArticle>;
    comments: APIResponsePagniationSuccess<Comment[]>;
    commentReplies: APIResponsePagniationSuccess<Comment[]>;
  }> => {
    const { category, id } = params as Params;
    const articleId = decodeURIComponent(id ?? '');
    const commentId = getUrlQuery(request, 'comment_id', 'initial');
    const page = getUrlQuery(request, 'page', '1');
    const pageReply = getUrlQuery(request, 'page_reply', '1');

    const query = getDetailsArticleQuery(category ?? 'about', articleId);
    const queryComments = getCommentsQuery(articleId, page);
    const queryCommentReplies = getCommentRepliesQuery(
      articleId,
      commentId,
      pageReply
    );

    const detailsArticle = await fetchOrCache<
      APIResponseDetailsSuccess<IDetailsArticle>
    >(queryClient, query.queryKey, () => queryClient.fetchQuery(query));

    const comments = await fetchOrCache<
      APIResponsePagniationSuccess<Comment[]>
    >(queryClient, queryComments.queryKey, () =>
      queryClient.fetchQuery(queryComments)
    );

    const commentReplies = await fetchOrCache<
      APIResponsePagniationSuccess<Comment[]>
    >(queryClient, queryCommentReplies.queryKey, () =>
      queryClient.fetchQuery(queryCommentReplies)
    );

    return { detailsArticle, comments, commentReplies };
  };

function getUrlQuery(request: Request, nameQuery: string, initial: string) {
  const url = new URL(request.url);
  return url.searchParams.get(nameQuery) ?? initial;
}
