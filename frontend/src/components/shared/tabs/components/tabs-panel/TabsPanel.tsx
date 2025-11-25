import styles from './TabsPanel.module.css';
import { TabsPanelProps } from './types';
import { useTabs } from '../../store';

export const TabsPanel = ({ children, ...props }: TabsPanelProps) => {
  const { selectedKey } = useTabs();

  if (selectedKey !== props.id && props.id) return null;

  return (
    <div {...props} className={styles.tabsPanel} role="tabpanel">
      {children}
    </div>
  );
};
