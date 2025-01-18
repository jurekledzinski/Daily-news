import { fetchOrCache, getUrlQuery } from '@helpers/index';
import { Params } from 'react-router-dom';
import {
  APIGuardianResponseSuccess,
  CategoriesData,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIGuardianResponsePagniationSuccess,
  Comment,
  APIResponsePagniationSuccess,
  LoaderCategoriesFn,
  LoaderArticlesFn,
  LoaderDetailsArticleFn,
} from './types';
import {
  getArticlesQuery,
  getCategoriesArticlesQuery,
  getDetailsArticleQuery,
  getCommentsQuery,
  getCommentRepliesQuery,
} from './queries';

export const loaderCategories: LoaderCategoriesFn =
  (queryClient) => async () => {
    const query = getCategoriesArticlesQuery();

    const categories = await fetchOrCache<
      APIGuardianResponseSuccess<CategoriesData[]>
    >(queryClient, query.queryKey, () => queryClient.fetchQuery(query));

    return categories && categories.response.status === 'ok'
      ? categories
      : null;
  };

export const loaderArticles: LoaderArticlesFn =
  (queryClient) =>
  async ({ params, request }) => {
    const { category } = params as Params;
    const page = getUrlQuery(request, 'page', '1');
    const query = getArticlesQuery(category ?? 'about', page);

    const articles = await fetchOrCache<
      APIGuardianResponsePagniationSuccess<IArticles[]>
    >(queryClient, query.queryKey, () => queryClient.fetchQuery(query));

    return articles && articles.response.status === 'ok' ? articles : null;
  };

export const loaderDetailsArticle: LoaderDetailsArticleFn =
  (queryClient) =>
  async ({ params, request }) => {
    const { category, id } = params as Params;
    const articleId = decodeURIComponent(id ?? '');
    const commentId = getUrlQuery(request, 'comment_id', 'initial');
    const page = getUrlQuery(request, 'page', '1');
    const pageReply = getUrlQuery(request, 'page_reply', '1');

    const queryArticle = getDetailsArticleQuery(category ?? 'about', articleId);
    const queryComments = getCommentsQuery(articleId, page);
    const queryCommentReplies = getCommentRepliesQuery(
      articleId,
      commentId,
      pageReply
    );

    const article = await fetchOrCache<
      APIResponseDetailsSuccess<IDetailsArticle>
    >(queryClient, queryArticle.queryKey, () =>
      queryClient.fetchQuery(queryArticle)
    );

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

    console.log('api loaderDetailsArticle detailsArticle', article);
    console.log('api loaderDetailsArticle comments', comments);
    console.log('api loaderDetailsArticle commentReplies', commentReplies);

    return {
      detailsArticle:
        article && article.response.status === 'ok' ? article : null,
      comments: comments.success ? comments : null,
      commentReplies: commentReplies.success ? commentReplies : null,
    };
  };
