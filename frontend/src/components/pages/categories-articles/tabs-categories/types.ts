export type DataCategories = {
  id: string;
  category: string;
  articles: {
    id: string;
    title: string;
  }[];
};

export type TabsCategoriesArticlesProps = {
  activeTabs: string[];
  state: DataCategories[];
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
