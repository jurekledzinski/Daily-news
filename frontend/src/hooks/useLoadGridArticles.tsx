import { LocalData } from '@components/pages';
import { useEffect } from 'react';
import {
  APIGuardianResponseError,
  APIGuardianResponsePagniationSuccess,
  IArticles,
} from '@api/index';
import {
  getCurrentCategory,
  getFormatedData,
  getLocalData,
  setLocalData,
  updateLocalData,
} from '@helpers/index';

type UseLoadGridArticlesProps = {
  category: string | undefined;
  data:
    | APIGuardianResponsePagniationSuccess<IArticles[]>
    | APIGuardianResponseError;
  searchParams: URLSearchParams;
  onSetState: (articles: LocalData['listArticles']) => void;
};

export const useLoadGridArticles = ({
  category,
  data,
  searchParams,
  onSetState,
}: UseLoadGridArticlesProps) => {
  useEffect(() => {
    if (!category) return;

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
