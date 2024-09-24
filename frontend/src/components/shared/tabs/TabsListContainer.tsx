import { TabsListContainerProps } from './types';

export const TabsListConainer = ({
  children,
  ...props
}: TabsListContainerProps) => {
  return (
    <div className="tabs__list-container" {...props}>
      {children}
    </div>
  );
};
