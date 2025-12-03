import { useInfiniteQueryFetch } from '@/hooks';

export type UseLoadMoreDataProps = {
  fetchNextPage: ReturnType<typeof useInfiniteQueryFetch>['fetchNextPage'];
  param?: string;
};
