import { ArticleDetails, Articles, CategoriesData } from './articles';
import { LoaderFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import {
  APIGuardianResDetailsSuccess,
  APIGuardianResPaginationSuccess,
  APIGuardianResSuccess,
} from './guardian';

export type LoaderCategoriesFn = (
  queryClient: QueryClient
) => () => Promise<APIGuardianResSuccess<CategoriesData[]> | null>;

export type LoaderArticlesFn = (
  queryClient: QueryClient
) => ({
  params,
  request,
}: LoaderFunctionArgs) => Promise<APIGuardianResPaginationSuccess<
  Articles[]
> | null>;

export type LoaderDetailsArticleFn = (queryClient: QueryClient) => ({
  params,
  request,
}: LoaderFunctionArgs) => Promise<{
  detailsArticle: APIGuardianResDetailsSuccess<ArticleDetails> | null;
}>;
