import type ReactGridLayout from 'react-grid-layout';

export type LayoutItem = {
  id?: string | undefined;
  isDropped?: boolean;
  ui: ReactGridLayout.Layout;
  title: string;
};

export type LayoutData = {
  [P: string]: LayoutItem[];
};
