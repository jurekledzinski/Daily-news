import { fetchOrCache, getUrlQuery } from '@/helpers';
import { Params } from 'react-router-dom';
import {
  getArticlesQuery,
  getCategoriesArticlesQuery,
  getDetailsArticleQuery,
} from './queries';

import {
  APIGuardianResSuccess,
  APIGuardianResPaginationSuccess,
  APIGuardianResDetailsSuccess,
} from './types/guardian';

import { Articles, CategoriesData, ArticleDetails } from './types/articles';

import {
  LoaderArticlesFn,
  LoaderCategoriesFn,
  LoaderDetailsArticleFn,
} from './types/loaders';

export const loaderCategories: LoaderCategoriesFn =
  (queryClient) => async () => {
    const query = getCategoriesArticlesQuery();

    const categories = await fetchOrCache<
      APIGuardianResSuccess<CategoriesData[]>
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
      APIGuardianResPaginationSuccess<Articles[]>
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
      APIGuardianResDetailsSuccess<ArticleDetails>
    >(queryClient, queryArticle.queryKey, () =>
      queryClient.fetchQuery(queryArticle)
    );

    return {
      detailsArticle:
        article && article.response.status === 'ok' ? article : null,
    };
  };
