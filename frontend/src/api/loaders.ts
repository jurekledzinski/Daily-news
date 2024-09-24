import {
  APIResponseSuccess,
  ICategories,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIResponsePagniationSuccess,
} from './types';
import { LoaderFunctionArgs, Params } from 'react-router-dom';
import {
  getArticlesQuery,
  getCategoriesArticlesQuery,
  getDetailsArticleQuery,
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
  }: LoaderFunctionArgs): Promise<
    APIResponsePagniationSuccess<IArticles[]>
  > => {
    const { category } = params as Params;
    const query = getArticlesQuery(category ?? '');

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const loaderDetailsArticle =
  (queryClient: QueryClient) =>
  async ({
    params,
  }: LoaderFunctionArgs): Promise<
    APIResponseDetailsSuccess<IDetailsArticle>
  > => {
    const { category, id } = params as Params;
    const query = getDetailsArticleQuery(category ?? '', id ?? '');

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
