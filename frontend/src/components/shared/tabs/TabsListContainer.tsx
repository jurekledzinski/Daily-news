import { forwardRef, Ref } from 'react';
import { TabsListContainerProps } from './types';
import './Tabs.css';

export const TabsListConainer = forwardRef<
  HTMLDivElement,
  TabsListContainerProps
>(({ children, ...props }, ref: Ref<HTMLDivElement>) => {
  return (
    <div className="tabs__list-container" {...props} ref={ref}>
      {children}
    </div>
  );
});
