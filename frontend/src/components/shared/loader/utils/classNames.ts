import styles from '../Loader.module.css';
import { classNames, generateClassNames } from '@helpers';
import { LoaderClassNames } from './types';

export const loaderClassNames: LoaderClassNames = (params) => {
  const { border, className, position, size } = params;

  return classNames(
    generateClassNames(styles, {
      loader: true,
      [`${border}`]: Boolean(border),
      [`${position}`]: Boolean(position),
      [`${size}`]: Boolean(size),
    }),
    className ?? ''
  );
};
