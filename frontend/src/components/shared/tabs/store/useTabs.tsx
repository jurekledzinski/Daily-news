import { TabsContext } from './context';
import { useContext } from 'react';

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs context not found!');
  return context;
};
