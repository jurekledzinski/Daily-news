import { TabsListProps } from './types';

export const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className="tabs__list" role="tablist">
      {children}
    </div>
  );
};
