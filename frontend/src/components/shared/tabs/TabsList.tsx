import { TabsListProps } from './types';
import './Tabs.css';

export const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className="tabs__list" role="tablist">
      {children}
    </div>
  );
};
