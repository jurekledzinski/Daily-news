import type ReactGridLayout from 'react-grid-layout';
import { categories } from '../../../../dummy-api';

export type LayoutItem = {
  id?: string | undefined;
  isDropped?: boolean;
  ui: ReactGridLayout.Layout;
  title: string;
};

export type LayoutData = {
  [P: string]: LayoutItem[];
};

export type GridTemplateCardProps = {
  data: (typeof categories)[0];
  isDisabled: boolean;
};

export type GridLayoutProps = {
  data: LayoutData;
  setData: React.Dispatch<React.SetStateAction<LayoutData>>;
};

export type GridCardProps = {
  children?: React.ReactNode;
  className: string;
  gridItem: LayoutItem;
  onClick: (value: string) => void;
};
