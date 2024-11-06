import { fetchOrCache, getUrlQuery } from '@helpers/index';
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
  APIGuardianResponseError,
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

    return categories
      ? categories
      : { response: { results: [], status: '', total: 1, userTier: '' } };
  };

export const loaderArticles =
  (queryClient: QueryClient) =>
  async ({
    params,
    request,
  }: LoaderFunctionArgs): Promise<
    APIGuardianResponsePagniationSuccess<IArticles[]> | APIGuardianResponseError
  > => {
    const { category } = params as Params;
    const page = getUrlQuery(request, 'page', '1');

    const query = getArticlesQuery(category ?? 'about', page);

    const articles: APIGuardianResponsePagniationSuccess<IArticles[]> =
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query));

    if (articles.response.status === 'error' || !articles) {
      return {
        response: {
          currentPage: 1,
          pages: 1,
          pageSize: 1,
          results: [],
          startIndex: 1,
          status: 'error',
          total: 1,
          userTier: '',
          message: articles.response.message,
        },
      };
    } else {
      return articles;
    }
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

    return {
      detailsArticle:
        detailsArticle && detailsArticle.response.status === 'ok'
          ? detailsArticle
          : {
              response: {
                content: {
                  apiUrl: '',
                  elements: [],
                  fields: { body: '', headline: '', trailText: '' },
                  id: '',
                  sectionId: '',
                  webPublicationDate: '',
                  webTitle: '',
                },
                status: 'error',
                total: 1,
                userTier: '',
                message: detailsArticle.response.message,
              },
            },
      comments: comments.success
        ? comments
        : {
            page: 1,
            payload: { result: [] },
            success: false,
            totalPages: 1,
            replyCount: 1,
            message: comments.message,
          },
      commentReplies: commentReplies.success
        ? commentReplies
        : {
            page: 1,
            payload: { result: [] },
            success: false,
            totalPages: 1,
            replyCount: 1,
            message: commentReplies.message,
          },
    };
  };
