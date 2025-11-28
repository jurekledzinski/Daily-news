import { useNavigate } from 'react-router';

export const useNavigateToDetailsArticle = () => {
  const navigate = useNavigate();

  const navigateDetailsArticle = (id: string) => {
    const url = new URL(window.location.href);
    navigate({ pathname: `${url.pathname}/${encodeURIComponent(id)}` });
  };

  return navigateDetailsArticle;
};
