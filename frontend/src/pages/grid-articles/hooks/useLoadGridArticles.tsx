import { useEffect } from 'react';
import { UseLoadGridArticlesProps } from './types';
import {
  getCurrentCategory,
  getFormatedData,
  getLocalData,
  setLocalData,
  updateLocalData,
} from '@/helpers';

export const useLoadGridArticles = ({
  category,
  data,
  searchParams,
  onSetState,
}: UseLoadGridArticlesProps) => {
  useEffect(() => {
    if (!data || !category) return;

    const formatedData = data.response.results.map((i) => getFormatedData(i));

    const isCategoryInLocalStorage = getCurrentCategory(category);

    if (isCategoryInLocalStorage) {
      const localData1 = getLocalData();
      const updateData = updateLocalData(
        localData1,
        category,
        formatedData,
        searchParams
      );
      setLocalData(updateData);

      const currentCategory = getCurrentCategory(category);

      if (!currentCategory) return;

      onSetState(currentCategory.listArticles);
    }
  }, [category, data, searchParams, onSetState]);
};
