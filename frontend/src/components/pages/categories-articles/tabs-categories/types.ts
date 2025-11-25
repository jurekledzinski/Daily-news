import { GridStackNode } from 'gridstack';

export type TabsCategoriesProps = {
  categories: GridStackNode[];
  category?: string;
  navigateCategory?: (key: string) => void;
};
