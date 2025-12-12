import styles from './EmptyState.module.css';
import { EmptyStateProps } from './types';
import { Image } from '../image';

export const EmptyState = ({ text, src }: EmptyStateProps) => {
  return (
    <div className={styles.emptyState}>
      <Image className={styles.image} src={src} loading="lazy" alt="Empty state image" />
      <p className={styles.text}>{text}</p>
    </div>
  );
};
