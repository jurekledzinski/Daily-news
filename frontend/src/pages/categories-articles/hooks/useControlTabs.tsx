import { cloneDeep } from 'lodash';
import { getCurrentCategory, getLocalData } from '@/helpers';
import {
  HandleAddSubArticle,
  HandleCloseTab,
  UseControlTabsProps,
} from './types';
import {
  getSubArticlesOnClose,
  setArticlesOnClose,
  setSubArticlesOnClose,
} from './helpers';

export const useControlTabs = ({
  activeTabs,
  category,
  data,
  onChangeData,
  onRedirectOne,
  onRedirectTwo,
  onSetActiveTabs,
  onAddSubArticle,
}: UseControlTabsProps) => {
  const handleCloseTab: HandleCloseTab = (e, id) => {
    e.stopPropagation();

    const { filterCategories, name, page } = setArticlesOnClose(data, id);

    if (filterCategories.length && name && page) {
      onSetActiveTabs([name]);
      onChangeData(filterCategories);
      onRedirectOne(`/categories/${name}/articles?page=${page}`);
    } else {
      onSetActiveTabs([]);
      onChangeData([]);
      onRedirectTwo('/');
    }
  };
  const handleCloseSubTab: HandleCloseTab = (e, id) => {
    e.stopPropagation();

    const { filterArticles, name } = getSubArticlesOnClose(data, category, id);

    if (filterArticles.length && name) {
      const copyActiveTabs = cloneDeep(activeTabs);
      copyActiveTabs[1] = name;
      onSetActiveTabs([...copyActiveTabs]);
      const updatedData = setSubArticlesOnClose(data, category, filterArticles);
      onChangeData(updatedData);
      const articleId = encodeURIComponent(name);
      onRedirectOne(`/categories/${category}/articles/article/${articleId}`);
    } else {
      onSetActiveTabs([activeTabs[0]]);
      const updatedData = setSubArticlesOnClose(data, category, []);
      onChangeData(updatedData);
      const page = getCurrentCategory(category)?.page ?? '1';
      onRedirectTwo(`/categories/${category}/articles?page=${page}`);
    }
  };

  const handleAddSubArticle: HandleAddSubArticle = (value, category) => {
    const localData = getLocalData();

    const filteredData = localData.map((itemCategory) =>
      itemCategory.id === category
        ? {
            ...itemCategory,
            articles: itemCategory.articles.some(
              (article) => article.id === value.id
            )
              ? itemCategory.articles
              : [...itemCategory.articles, value],
          }
        : itemCategory
    );

    onAddSubArticle(filteredData, value.id);
  };

  return { handleCloseTab, handleCloseSubTab, handleAddSubArticle };
};
