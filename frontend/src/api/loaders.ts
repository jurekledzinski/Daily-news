import { fetchOrCache, getUrlQuery } from '@helpers/index';
import { Params } from 'react-router-dom';
import {
  APIGuardianResponseSuccess,
  CategoriesData,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIGuardianResponsePagniationSuccess,
  LoaderCategoriesFn,
  LoaderArticlesFn,
  LoaderDetailsArticleFn,
} from './types';
import {
  getArticlesQuery,
  getCategoriesArticlesQuery,
  getDetailsArticleQuery,
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
  async ({ params }) => {
    const { category, id } = params as Params;
    const articleId = decodeURIComponent(id ?? '');
    const queryArticle = getDetailsArticleQuery(category ?? 'about', articleId);

    const article = await fetchOrCache<
      APIResponseDetailsSuccess<IDetailsArticle>
    >(queryClient, queryArticle.queryKey, () =>
      queryClient.fetchQuery(queryArticle)
    );

    return {
      detailsArticle:
        article && article.response.status === 'ok' ? article : null,
    };
  };
