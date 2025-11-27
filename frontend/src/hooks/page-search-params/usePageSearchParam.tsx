import { useParams, useSearchParams } from 'react-router';

const paramsOptions = { preventScrollReset: true, viewTransition: true };

export const usePageSearchParam = (query: string = 'page') => {
  const params = useParams<{ category: string; id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(query) ?? 1);

  const setPage = (next: number) => setSearchParams({ [query]: String(next + 1) }, paramsOptions);

  return { page, params, setPage };
};
