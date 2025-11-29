import styles from './Comment.module.css';
import { CommentProps } from './types';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../heading';
import { Icon } from '../icon';

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
      <div className={styles.footer}>
        <Icon className={styles.icon} color="info" icon={faThumbsUp} />
        <span className={styles.likes}>{comment.likes}</span>
      </div>
    </div>
  );
};
