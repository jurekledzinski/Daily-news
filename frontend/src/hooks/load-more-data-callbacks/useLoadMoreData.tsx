import { useCallback } from 'react';
import { UseLoadMoreDataProps } from './types';
import { usePersistedScrollPage } from '../persisted-scroll-page';
import { usePageSearchParam } from '../page-search-params';

export const useLoadMoreData = ({ param, fetchNextPage }: UseLoadMoreDataProps) => {
  const { saveInLocalstoragePage } = usePersistedScrollPage();
  const { page, setPage } = usePageSearchParam();

  const loadMoreData = useCallback(() => {
    if (!param) return;
    fetchNextPage();
    setPage(page);
    saveInLocalstoragePage('pages', param, page + 1);
  }, [param, fetchNextPage, page, saveInLocalstoragePage, setPage]);

  return { loadMoreData };
};
