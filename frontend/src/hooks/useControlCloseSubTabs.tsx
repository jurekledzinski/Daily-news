import { cloneDeep } from 'lodash';
import { MouseEvent } from 'react';

type Data = {
  id: string;
  category: string;
  articles: {
    id: string;
    title: string;
  }[];
};

type UseControlCloseSubTabs = {
  activeTabs: string[];
  category: string;
  data: Data[];
  onChangeData: (data: Data['articles'] | []) => void;
  onRedirectOne: (category: string, name: string) => void;
  onRedirectTwo: (category: string) => void;
  onSetActiveTabs: (value: string[] | []) => void;
};

export const useControlCloseSubTabs = ({
  activeTabs,
  category,
  data,
  onChangeData,
  onSetActiveTabs,
  onRedirectOne,
  onRedirectTwo,
}: UseControlCloseSubTabs) => {
  const handleCloseSubTab = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    const copyState = Object.entries(cloneDeep(data));
    const objState = Object.fromEntries(
      copyState.map((item) => [item[1].id, { articles: item[1].articles }])
    );
    const articles = objState[category as keyof typeof objState].articles;
    const index = articles.findIndex((i) => i.id === id);
    const filterArticles = articles.filter((i) => i.id !== id);
    const move = index <= 0 ? 0 : Math.min(index, filterArticles.length - 1);

    if (filterArticles.length) {
      const name = filterArticles[move].id;
      const copy = cloneDeep(activeTabs);
      copy[1] = name;
      onSetActiveTabs([...copy]);
      onChangeData(filterArticles);
      onRedirectOne(category, name);
    } else {
      onSetActiveTabs([activeTabs[0]]);
      onChangeData([]);
      onRedirectTwo(category);
    }
  };
  return {
    handleCloseSubTab,
  };
};
