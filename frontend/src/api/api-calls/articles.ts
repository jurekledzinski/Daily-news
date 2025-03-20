import { ArticleDetails, Articles, CategoriesData } from '../types';
import { fetchApi } from './helpers';
import { tryCatch } from '@/helpers';
import { URLS } from '../urls';
import {
  APIGuardianResDetailsSuccess,
  APIGuardianResError,
  APIGuardianResPaginationSuccess,
  APIGuardianResSuccess,
} from '../types/guardian';

export const getCategoriesArticles = tryCatch<
  APIGuardianResSuccess<CategoriesData[]>,
  null
>(async () => fetchApi({ url: URLS.GET_CATEGORIES_ARTICLES() }));

export const getArticles = tryCatch<
  APIGuardianResPaginationSuccess<Articles[]>,
  null,
  { category: string; page: string }
>(
  async (data: { category: string; page: string }) =>
    await fetchApi({ url: URLS.GET_ARTICLES(data.category, data.page) })
);

export const getDetailsArticle = tryCatch<
  APIGuardianResDetailsSuccess<ArticleDetails>,
  APIGuardianResError,
  string
>(async (id: string) => await fetchApi({ url: URLS.GET_DETAILS_ARTICLE(id) }));
