import { cloneDeep } from 'lodash';
import { LocalData } from '../components/pages';
import { MouseEvent } from 'react';

type UseControlTabsProps = {
  data: LocalData[];
  onChangeData: (data: LocalData[] | [], id?: string) => void;
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
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();

    const index = data.findIndex((i) => i.id === id);
    const filterState = cloneDeep(data).filter((i) => i.id !== id);
    const move = index <= 0 ? 0 : Math.min(index, filterState.length - 1);

    if (filterState.length) {
      const name = filterState[move].id ?? '';
      onSetActiveTabs([name]);
      onChangeData(filterState, id);
      onRedirectOne(name);
    } else {
      onSetActiveTabs([]);
      onChangeData([], id);
      onRedirectTwo();
    }
  };
  return {
    handleCloseTab,
  };
};
