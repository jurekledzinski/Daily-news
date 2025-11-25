import { TabsListProps } from './types';
import styles from './TabsList.module.css';

export const TabsList = ({ children, ...props }: TabsListProps) => {
  return (
    <div {...props} className={styles.tabList} role="tablist">
      {children}
    </div>
  );
};
