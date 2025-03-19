import { LocalData } from '@/components/pages';

export type HandleCloseTab = (
  e: React.MouseEvent<HTMLSpanElement>,
  id: string
) => void;

export type HandleAddSubArticle = (
  value: {
    id: string;
    title: string;
  },
  category: string
) => void;

export type UseControlTabsProps = {
  activeTabs: string[];
  category: string;
  data: LocalData[];
  onChangeData: (data: LocalData[] | []) => void;
  onRedirectOne: (url: string) => void;
  onRedirectTwo: (url: string) => void;
  onSetActiveTabs: (value: string[] | []) => void;
  onAddSubArticle: (data: LocalData[], id: string) => void;
};
