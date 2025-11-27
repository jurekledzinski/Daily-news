import { useNavigate } from 'react-router';

export const useNavigateToDetailsArticle = () => {
  const navigate = useNavigate();

  const navigateDetailsArticle = (id: string) => {
    const url = new URL(window.location.href);
    navigate({ pathname: `${url.pathname}/${id}` });
  };

  return navigateDetailsArticle;
};
