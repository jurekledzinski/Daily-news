import { APIErrorResponse, APISuccessResponse, fetchApi, URLS } from '@api';
import { asyncStoragePersister, queryClient } from '@routes';
import { findTheBiggestImageInArticle, getCookie, loaderTryCatch } from '@helpers';
import { persistQueryClientRestore, persistQueryClientSave } from '@tanstack/query-persist-client-core';
import type { LoaderFunction, Params } from 'react-router';
import type { Content } from '@guardian/content-api-models/v1/content';

const loadDetails = async (params: Params<string>) => {
  const category = params.category ?? '';
  const id = decodeURIComponent(params.id ?? '');

  await persistQueryClientRestore({ queryClient: queryClient, persister: asyncStoragePersister });

  const data = await queryClient.ensureQueryData<APISuccessResponse<Content>, APIErrorResponse>({
    queryKey: ['details-article', category, id],
    queryFn: async () => {
      const response = await fetchApi({ url: URLS.GET_DETAILS_ARTICLE(id) });
      return { payload: response.response.content, success: true };
    },
  });

  await persistQueryClientSave({ queryClient, persister: asyncStoragePersister });

  const biggestImage = findTheBiggestImageInArticle(data);
  const formattedData = { ...data.payload, image: biggestImage };

  if ('message' in data) return { success: false };
  return { data: formattedData, success: true };
};

export const loadToken = async () => {
  const enabled = getCookie('enable');

  if (!enabled) return { success: false };

  const data = await fetchApi({ url: URLS.GET_CSRF_TOKEN() });

  if ('message' in data) return { success: false };
  return { data: data.payload, success: true };
};

export const loaderArticleDetailsPage: LoaderFunction = async ({ params }) => {
  return {
    article: await loaderTryCatch(loadDetails(params)),
    token: await loaderTryCatch(loadToken()),
  };
};
