import styles from './ValidationBlocks.module.css';
import { classNames } from '@helpers';
import { ValidationBlocksProps } from './types';

export const ValidationBlocks = ({ children, className }: ValidationBlocksProps) => {
  return <div className={classNames(styles.validation, className ?? '')}>{children}</div>;
};
