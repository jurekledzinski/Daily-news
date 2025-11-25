import { APIErrorResponse, APIGuardianSuccessResponse } from '../api';
import { fetchApi } from '../api-calls';
import { getUrlQuery } from '@helpers';
import { queryClient } from '@routes';
import { URLS } from '../urls';
import type { LoaderFunction } from 'react-router';
import type { SearchResponse } from '@guardian/content-api-models/v1/SearchResponse';

export const loaderArticlesListPage: LoaderFunction = async ({ params, request }) => {
  const page = getUrlQuery(request, 'page', '1');
  const category = params.category ?? 'about';

  try {
    const { response } = await queryClient.fetchQuery<
      APIGuardianSuccessResponse<SearchResponse>,
      APIErrorResponse
    >({
      queryKey: ['list-articles', category, page],
      queryFn: async () => await fetchApi({ url: URLS.GET_ARTICLES(category, page) }),
    });

    return {
      ...response,
      success: true,
    };
  } catch {
    return { success: false };
  }
};
