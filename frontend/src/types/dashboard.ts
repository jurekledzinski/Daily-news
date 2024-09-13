import type ReactGridLayout from 'react-grid-layout';

export type LayoutItem = {
  ui: ReactGridLayout.Layout;
};

export type LayoutData = {
  [P: string]: LayoutItem[];
};
