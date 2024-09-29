import type ReactGridLayout from 'react-grid-layout';
// import { categories } from '../../../../dummy-api';
import { IDataCategories } from '../../../../api';

export type LayoutItem = {
  id?: string | undefined;
  ui: ReactGridLayout.Layout;
  title: string;
};

export type LayoutData = {
  [P: string]: LayoutItem[];
};

export type GridTemplateCardProps = {
  //   data: (typeof categories)[0];
  data: IDataCategories;
  isDisabled: boolean;
};

export type GridLayoutProps = {
  layout: LayoutData;
  setLayout: (data: LayoutData) => void;
};

export type GridCardProps = {
  children?: React.ReactNode;
  className: string;
  gridItem: LayoutItem;
  onClick: (value: string) => void;
};

export interface LocalData extends Omit<LayoutItem, 'ui'> {
  ui: { [P: string]: LayoutItem['ui'] };
  articles: {
    id: string;
    title: string;
    scroll?: number;
  }[];
  listArticles: { content: string; id: string; title: string; image: string }[];
  page: string;
}

export type ObjArticles = {
  [id: string]: {
    articles: LocalData['articles'];
  };
};
