import { getLocalData } from '@helpers';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const navigationOptions = { preventScrollReset: true, viewTransition: true };

export const useNavigateToArticles = () => {
  const navigate = useNavigate();

  const navigateArticles = useCallback(
    (id: string) => {
      const page = getLocalData<Record<string, string>>('pages', 'object')[id];
      const url = page ? `categories/${id}/articles?page=${page}` : `categories/${id}/articles`;
      navigate(url, navigationOptions);
    },
    [navigate]
  );

  return navigateArticles;
};
