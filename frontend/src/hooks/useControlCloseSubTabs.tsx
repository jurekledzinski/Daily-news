import { cloneDeep } from 'lodash';
import { MouseEvent } from 'react';
import { LocalData, ObjArticles } from '../components/pages';

type UseControlCloseSubTabs = {
  activeTabs: string[];
  category: string;
  data: LocalData[];
  onChangeData: (data: LocalData['articles'] | [], id?: string) => void;
  onRedirectOne: (category: string, id: string) => void;
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
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    const copyState = Object.entries(cloneDeep(data));
    const objState: ObjArticles = Object.fromEntries(
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
      onChangeData(filterArticles, id);
      onRedirectOne(category, name);
    } else {
      onSetActiveTabs([activeTabs[0]]);
      onChangeData([], id);
      onRedirectTwo(category);
    }
  };
  return {
    handleCloseSubTab,
  };
};
