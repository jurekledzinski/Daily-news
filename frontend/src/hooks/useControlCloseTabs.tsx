import { cloneDeep } from 'lodash';
import { MouseEvent } from 'react';
import { LocalData } from '../components/pages';

type UseControlTabsProps = {
  data: LocalData[];
  onChangeData: (data: LocalData[] | []) => void;
  onRedirectOne: (category: string) => void;
  onRedirectTwo: () => void;
  onSetActiveTabs: (value: string[] | []) => void;
};

export const useControlCloseTabs = ({
  data,
  onChangeData,
  onRedirectOne,
  onRedirectTwo,
  onSetActiveTabs,
}: UseControlTabsProps) => {
  const handleCloseTab = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    const index = data.findIndex((i) => i.id === id);
    const filterState = cloneDeep(data).filter((i) => i.id !== id);
    const move = index <= 0 ? 0 : Math.min(index, filterState.length - 1);

    if (filterState.length) {
      const name = filterState[move].id ?? '';
      //   setActiveTabs([name]);
      onSetActiveTabs([name]);
      //   setState(filterState);
      onChangeData(filterState);
      //   navigate(`/categories/${name}/articles`, { replace: true });
      onRedirectOne(name);
    } else {
      //   setActiveTabs([]);
      onSetActiveTabs([]);
      //   setState([]);
      onChangeData([]);
      //   navigate('/');
      onRedirectTwo();
    }
  };
  return {
    handleCloseTab,
  };
};
