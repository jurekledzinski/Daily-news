import { getLocalData } from '@/helpers';
import { useNavigate } from 'react-router';

export const useNavigateToCategory = () => {
  const navigate = useNavigate();

  const navigateCategory = (key: string) => {
    const page = getLocalData<Record<string, string>>('pages', 'object')[key];
    const url = page ? `/categories/${key}/articles?page=${page}` : `/categories/${key}/articles`;
    navigate(url, { preventScrollReset: true, viewTransition: true });
  };

  return navigateCategory;
};
