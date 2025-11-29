import styles from './CommentsSection.module.css';
import { CommentsSectionProps } from './types';

export const CommentsSection = ({ children }: CommentsSectionProps) => {
  return (
    <div className={styles.commentsSection}>
      <div className={styles.header}>Comments</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
