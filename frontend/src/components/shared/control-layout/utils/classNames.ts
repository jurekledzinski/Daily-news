import styles from '../ControlLayout.module.css';
import { classNames, generateClassNames } from '@helpers';
import { ControlLayoutClassNames, IconControlLayoutClassNames } from './types';

export const controlLayoutClassNames: ControlLayoutClassNames = (params) => {
  const { as, className, disabled, isError, isEndIcon, isStartIcon, isPending, variant } = params;

  return classNames(
    generateClassNames(styles, {
      wrapper: true,
      [`${variant}`]: Boolean(variant),
      disabled: Boolean(disabled),
      inValid: isError === true,
      valid: isError === false,
      'wrapper-startIcon': Boolean(isStartIcon),
      'wrapper-endIcon': Boolean(isEndIcon) || Boolean(isPending),
      'wrapper-text': as === 'input',
      'wrapper-area': as === 'textarea',
    }),
    className ?? ''
  );
};

export const iconControlLayoutClassNames: IconControlLayoutClassNames = (params) => {
  const { className, size, type, variant } = params;

  return classNames(
    generateClassNames(styles, {
      [`${type}`]: true,
      [`${type}-${size}`]: Boolean(size),
      [`${type}-${variant}`]: Boolean(variant),
    }),
    className ?? ''
  );
};
