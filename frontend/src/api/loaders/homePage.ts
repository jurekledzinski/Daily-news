import { APIErrorResponse, APISuccessResponse } from '../api';
import { fetchApi } from '../api-calls';
import { queryClient } from '@/routes';
import { URLS } from '../urls';
import type { LoaderFunction } from 'react-router';
import type { Section } from '@guardian/content-api-models/v1/section';

export const loaderHomePage: LoaderFunction = async () => {
  try {
    const data = await queryClient.fetchQuery<APISuccessResponse<Section[]>, APIErrorResponse>({
      queryKey: ['list-categories'],
      queryFn: async () => {
        const response = await fetchApi({ url: URLS.GET_CATEGORIES_ARTICLES() });
        return response.response.results;
      },
    });
    return { data, success: true };
  } catch {
    return { success: false };
  }
};
