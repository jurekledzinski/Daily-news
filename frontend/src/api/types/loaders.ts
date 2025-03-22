import { ArticleDetails, Articles, CategoriesData } from './articles';
import { LoaderFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import {
  APIGuardianResDetailsSuccess,
  APIGuardianResError,
  APIGuardianResPaginationSuccess,
  APIGuardianResSuccess,
} from './guardian';

export type LoaderCategoriesFn = (
  queryClient: QueryClient
) => () => Promise<
  APIGuardianResSuccess<CategoriesData[]> | APIGuardianResError | null
>;

export type LoaderArticlesFn = (
  queryClient: QueryClient
) => ({
  params,
  request,
}: LoaderFunctionArgs) => Promise<
  APIGuardianResPaginationSuccess<Articles[]> | APIGuardianResError | null
>;

export type LoaderDetailsArticleFn = (queryClient: QueryClient) => ({
  params,
  request,
}: LoaderFunctionArgs) => Promise<{
  detailsArticle:
    | APIGuardianResDetailsSuccess<ArticleDetails>
    | APIGuardianResError
    | null;
}>;
