import { APIErrorResponse, APISuccessResponse } from '../api';
import { asyncStoragePersister, queryClient } from '@routes';
import { fetchApi } from '../api-calls';
import { URLS } from '../urls';
import type { LoaderFunction } from 'react-router';
import type { Section } from '@guardian/content-api-models/v1/section';
import {
  persistQueryClientRestore,
  persistQueryClientSave,
} from '@tanstack/query-persist-client-core';

export const loaderHomePage: LoaderFunction = async () => {
  try {
    await persistQueryClientRestore({ queryClient: queryClient, persister: asyncStoragePersister });

    const data = await queryClient.ensureQueryData<APISuccessResponse<Section[]>, APIErrorResponse>(
      {
        queryKey: ['list-categories'],
        queryFn: async () => {
          const response = await fetchApi({ url: URLS.GET_CATEGORIES_ARTICLES() });
          return response.response.results;
        },
        revalidateIfStale: false,
      }
    );

    await persistQueryClientSave({ queryClient, persister: asyncStoragePersister });

    return { data, success: true };
  } catch {
    return { success: false };
  }
};
