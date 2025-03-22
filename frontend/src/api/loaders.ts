import { ArticleDetails, Articles, CategoriesData } from './types';
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
  APIGuardianResError,
} from './types/guardian';

import {
  LoaderArticlesFn,
  LoaderCategoriesFn,
  LoaderDetailsArticleFn,
} from './types/loaders';

export const loaderCategories: LoaderCategoriesFn =
  (queryClient) => async () => {
    const query = getCategoriesArticlesQuery();

    const categories = await fetchOrCache<
      Promise<APIGuardianResSuccess<CategoriesData[]> | APIGuardianResError>
    >(queryClient, query.queryKey, () => queryClient.fetchQuery(query));

    if ('message' in categories) return null;

    return categories;
  };

export const loaderArticles: LoaderArticlesFn =
  (queryClient) =>
  async ({ params, request }) => {
    const { category } = params as Params;
    const page = getUrlQuery(request, 'page', '1');
    const query = getArticlesQuery(category ?? 'about', page);

    const articles = await fetchOrCache<
      Promise<APIGuardianResPaginationSuccess<Articles[]> | APIGuardianResError>
    >(queryClient, query.queryKey, () => queryClient.fetchQuery(query));

    if ('message' in articles) return null;

    return articles;
  };

export const loaderDetailsArticle: LoaderDetailsArticleFn =
  (queryClient) =>
  async ({ params }) => {
    const { category, id } = params as Params;
    const articleId = decodeURIComponent(id ?? '');
    const queryArticle = getDetailsArticleQuery(category ?? 'about', articleId);

    const article = await fetchOrCache<
      Promise<
        APIGuardianResDetailsSuccess<ArticleDetails> | APIGuardianResError
      >
    >(queryClient, queryArticle.queryKey, () =>
      queryClient.fetchQuery(queryArticle)
    );

    if ('message' in article) return { detailsArticle: null };

    return {
      detailsArticle: article,
    };
  };
