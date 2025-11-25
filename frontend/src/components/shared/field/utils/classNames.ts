import styles from '../Field.module.css';
import { classNames, generateClassNames } from '@helpers';
import { FieldClassNames } from './types';

export const fieldClassNames: FieldClassNames = ({ className }) => {
  return classNames(
    generateClassNames(styles, {
      field: true,
    }),
    className ?? ''
  );
};
