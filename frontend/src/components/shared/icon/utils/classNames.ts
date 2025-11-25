import styles from '../Icon.module.css';
import { classNames, generateClassNames } from '@helpers';
import { IconClassNames } from './types';

export const iconClassNames: IconClassNames = (params) => {
  const { className, color } = params;

  return classNames(
    generateClassNames(styles, {
      icon: true,
      [`${color}`]: Boolean(color),
    }),
    className ?? ''
  );
};
