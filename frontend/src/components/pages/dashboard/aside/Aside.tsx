import styles from './Aside.module.css';
import type { AsideProps } from './types';

export const Aside = ({ children, ...props }: AsideProps) => {
  return (
    <div className={styles.asideContainer} {...props}>
      <div className={styles.aside}>{children}</div>
    </div>
  );
};
