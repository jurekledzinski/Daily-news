export type useInfiniteQueryFetchProps = {
  queryKey: readonly unknown[];
  query?: string;
  url: (query: string, page?: unknown) => string;
};
