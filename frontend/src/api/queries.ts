import {
  getCategoriesArticles,
  getArticles,
  getDetailsArticle,
} from './apiCalls';

export const getCategoriesArticlesQuery = () => ({
  queryKey: ['list-categories'],
  queryFn: async () => getCategoriesArticles(),
});

export const getArticlesQuery = (category: string, page: string) => ({
  queryKey: ['list-articles', category, page],
  queryFn: async () => getArticles(category, page),
});

export const getDetailsArticleQuery = (category: string, id: string) => ({
  queryKey: ['details-article', category, id],
  queryFn: async () => getDetailsArticle(category, id),
});
