import styles from './TabsList.module.css';
import { classNames } from '@helpers';
import { forwardRef } from 'react';
import { TabsListProps } from './types';

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        className={classNames(styles.tabList, className ?? '')}
        ref={ref}
        role="tablist"
      >
        {children}
      </div>
    );
  }
);
