import styles from './ModalBody.module.css';
import { ModalBodyProps } from './types';

export const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className={styles.body}>{children}</div>;
};
