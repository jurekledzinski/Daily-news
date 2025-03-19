import { cloneDeep } from 'lodash';
import { LocalData } from '@/components/pages';

export const setArticlesOnClose = (data: LocalData[], id: string) => {
  const index = data.findIndex((i) => i.id === id);
  const filterCategories = cloneDeep(data).filter((i) => i.id !== id);
  const move = index <= 0 ? 0 : Math.min(index, filterCategories.length - 1);
  const name = filterCategories.length ? filterCategories[move].id : '';
  const page = filterCategories.length ? filterCategories[move].page : '';
  return { filterCategories, name, page };
};

export const getSubArticlesOnClose = (
  data: LocalData[],
  category: string,
  id: string
) => {
  const activeCategory = cloneDeep(data).find((item) => item.id === category);
  if (activeCategory) {
    const index = activeCategory.articles.findIndex((i) => i.id === id);
    const filterArticles = activeCategory.articles.filter((i) => i.id !== id);
    const move = index <= 0 ? 0 : Math.min(index, filterArticles.length - 1);
    const name = filterArticles.length ? filterArticles[move].id : '';
    return { filterArticles, name };
  }

  return { filterArticles: [] };
};

export const setSubArticlesOnClose = (
  data: LocalData[],
  category: string,
  articles: { id: string; title: string }[]
) => {
  return data.map((element) => {
    if (element.id === category) return { ...element, articles };
    return element;
  });
};
