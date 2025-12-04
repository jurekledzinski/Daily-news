import { APIErrorResponse, APISuccessResponse, fetchApi, URLS } from '@api';
import { findTheBiggestImageInArticle, getCookie } from '@helpers';
import { queryClient } from '@routes';
import type { LoaderFunction, Params } from 'react-router';
import type { Content } from '@guardian/content-api-models/v1/content';

const loadDetailsArticles = async (params: Params<string>) => {
  const category = params.category ?? '';
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

const loadToken = async () => {
  const enabled = getCookie('enable');
  if (!enabled) return { success: false };

  const data = await fetchApi({ url: URLS.GET_CSRF_TOKEN() });

  if ('message' in data) return { success: false };
  return { data: data.payload, success: true };
};

export const loaderArticleDetailsPage: LoaderFunction = async ({ params }) => {
  return {
    article: await loadDetailsArticles(params),
    token: await loadToken(),
  };
};
