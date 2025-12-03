import { getLocalData } from '@/helpers';
import { useNavigate } from 'react-router';

export const useNavigateToDetailsArticle = () => {
  const navigate = useNavigate();

  const navigateDetailsArticle = (id: string) => {
    const currentURL = new URL(window.location.href);
    const page = getLocalData<Record<string, string>>('pages', 'object')[id];
    navigate({
      pathname: `${currentURL.pathname}/${encodeURIComponent(id)}`,
      ...(page && { search: `?page=${page}` }),
    });
  };

  return navigateDetailsArticle;
};
