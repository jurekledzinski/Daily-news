import styles from './Label.module.css';
import { LabelProps } from './types';

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className={styles.label} {...props}>
      {children}
    </label>
  );
};
