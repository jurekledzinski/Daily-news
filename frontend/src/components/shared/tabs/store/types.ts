import { TabsProps } from '../types';

export type ContextTabs = Omit<TabsProps, 'children'>;

export type TabsProviderProps = {
  children: React.ReactNode;
  value: ContextTabs;
};
