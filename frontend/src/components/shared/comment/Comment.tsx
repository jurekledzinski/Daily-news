import styles from './Comment.module.css';
import { CommentProps } from './types';
import { Heading } from '../heading';

export const Comment = ({ comment }: CommentProps) => {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <Heading className={styles.heading} level={6}>
          {comment.user}
        </Heading>
        <span className={styles.publish}>{comment.createdAt}</span>
      </div>
      <div className={styles.content}>{comment.text}</div>
    </div>
  );
};
