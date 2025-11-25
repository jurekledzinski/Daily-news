import styles from '../Heading.module.css';
import { classNames, generateClassNames } from '@helpers';
import { HeadingClassNames } from './types';

export const headingClassNames: HeadingClassNames = (params) => {
  const { className, fw, level } = params;

  return classNames(
    generateClassNames(styles, {
      [`${fw}`]: Boolean(fw),
      [`h${level}`]: Boolean(level),
    }),
    className ?? ''
  );
};
