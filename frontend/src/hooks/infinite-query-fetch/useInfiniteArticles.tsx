import { APIErrorResponse, APIPaginationSuccessResponse, fetchApi } from '@api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteQueryFetchProps } from './types';
import { useMemo } from 'react';

export const useInfiniteQueryFetch = <T extends object>({
  query,
  queryKey,
  url,
}: useInfiniteQueryFetchProps) => {
  const { data, ...rest } = useInfiniteQuery<APIPaginationSuccessResponse<T>, APIErrorResponse>({
    queryKey,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? (lastPage.currentPage ?? 0) + 1 : undefined;
    },
    queryFn: async ({ pageParam }) => {
      if (!query) return Promise.reject('Query is undefined');

      const response = await fetchApi({ url: url(query, pageParam) });

      if ('payload' in response) return response;

      return {
        payload: response.response.results,
        hasNextPage: response.response.pages > response.response.currentPage,
        currentPage: response.response.currentPage,
      };
    },
    enabled: !!query,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  const loadedData = useMemo(() => {
    if (!data) return [];
    return data.pages.map((page) => page.payload).flat();
  }, [data]);

  return { loadedData, ...rest };
};
