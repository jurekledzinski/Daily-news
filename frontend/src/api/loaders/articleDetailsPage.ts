import { APIErrorResponse, APISuccessResponse } from '../api';
import { fetchApi } from '../api-calls';
import { findTheBiggestImageInArticle } from '@helpers';
import { queryClient } from '@routes';
import { URLS } from '../urls';
import type { LoaderFunction } from 'react-router';
import type { Content } from '@guardian/content-api-models/v1/content';

export const loaderArticleDetailsPage: LoaderFunction = async ({ params }) => {
  const category = params.category ?? 'about';
  const id = decodeURIComponent(params.id ?? '');

  try {
    const data = await queryClient.ensureQueryData<APISuccessResponse<Content>, APIErrorResponse>({
      queryKey: ['details-article', category, id],
      queryFn: async () => {
        const response = await fetchApi({ url: URLS.GET_DETAILS_ARTICLE(id) });
        return { payload: response.response.content, success: true };
      },
    });
    const biggestImage = findTheBiggestImageInArticle(data);
    const formattedData = { ...data.payload, image: biggestImage };

    return { data: formattedData, success: true };
  } catch {
    return { success: false };
  }
};
