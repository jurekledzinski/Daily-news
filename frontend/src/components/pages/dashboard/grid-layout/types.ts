import type ReactGridLayout from 'react-grid-layout';
import { IDataCategories } from '../../../../api';

export type LayoutItem = {
  id?: string | undefined;
  ui: ReactGridLayout.Layout;
  title: string;
  page: string;
};

export type LayoutData = {
  [P: string]: LayoutItem[];
};

export type GridTemplateCardProps = {
  data: IDataCategories;
  isDisabled: boolean;
};

export type GridLayoutProps = {
  layout: LayoutData;
  setLayout: (data: LayoutData) => void;
  onNavigate: (category: string, page: string) => void;
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
  }[];
  listArticles: { content: string; id: string; title: string; image: string }[];
  page: string;
}

export type ObjArticles = {
  [id: string]: {
    articles: LocalData['articles'];
  };
};
