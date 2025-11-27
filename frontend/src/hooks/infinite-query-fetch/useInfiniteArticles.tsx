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
    getNextPageParam: (lastPage) => lastPage.currentPage! + 1,
    queryFn: async ({ pageParam }) => {
      const response = await fetchApi({ url: url(query, pageParam) });
      if ('payload' in response) return response;
      return { payload: response.response.results, currentPage: response.response.currentPage };
    },
    enabled: !!query,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  const allData = useMemo(() => {
    if (!data) return [];
    return data.pages.map((page) => page.payload).flat();
  }, [data]);

  return { allData, ...rest };
};
