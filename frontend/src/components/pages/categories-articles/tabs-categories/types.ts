import { LocalData } from '../../dashboard';

export type TabsCategoriesArticlesProps = {
  activeTabs: string[];
  state: LocalData[];
  handleAddSubArticle: (value: {
    id: string;
    title: string;
    scroll: number;
  }) => void;
  handleCloseTab: (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: string
  ) => void;
  handleCloseSubTab: (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: string
  ) => void;
  onSetActiveTabs: (value: string[] | []) => void;
  onRedirectOne: (category: string) => void;
  onRedirectTwo: (category: string, id: string) => void;
};
