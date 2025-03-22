import { useEffect } from 'react';
import { UseLoadGridArticlesProps } from './types';
import {
  getCurrentCategory,
  getFormatedData,
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
    const currentCategory = getCurrentCategory(category);
    if (!currentCategory) return;

    const formatedData = data.response.results.map((i) => getFormatedData(i));

    const updateData = updateLocalData(category, formatedData, searchParams);

    setLocalData(updateData);

    const updatedCategory = getCurrentCategory(category);

    onSetState(updatedCategory ? updatedCategory.listArticles : []);
  }, [category, data, searchParams, onSetState]);
};
