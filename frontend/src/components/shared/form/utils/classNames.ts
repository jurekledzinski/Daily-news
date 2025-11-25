import styles from '../Form.module.css';
import { classNames, generateClassNames } from '@helpers';
import { FormClassNames, FormGroupClassNames } from './types';

export const formClassNames: FormClassNames = (params) => {
  const { className, orientation } = params;

  return classNames(
    generateClassNames(styles, {
      form: true,
      [`${orientation}`]: Boolean(orientation),
    }),
    className ?? ''
  );
};

export const formGroupClassNames: FormGroupClassNames = (params) => {
  const { className, orientation } = params;

  return classNames(
    generateClassNames(styles, {
      ['form-group']: true,
      [`${orientation}`]: Boolean(orientation),
    }),
    className ?? ''
  );
};
