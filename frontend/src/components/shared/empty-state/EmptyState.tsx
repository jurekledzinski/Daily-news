import styles from './EmptyState.module.css';
import { EmptyStateProps } from './types';

export const EmptyState = ({ title, src }: EmptyStateProps) => {
  return (
    <div className={styles.emptyState}>
      <img className={styles.image} src="images/mouse-click.png" alt="Empty state image" />
    </div>
  );
};
