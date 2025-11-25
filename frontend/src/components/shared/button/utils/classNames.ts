import styles from '../styles/Button.module.css';
import { ButtonClassNames } from './types';
import { classNames, generateClassNames } from '@helpers';

export const buttonClassNames: ButtonClassNames = ({
  className,
  color = 'primary',
  disabled,
  fullWidth,
  isLoading,
  size = 'size-md',
  variant = 'contained',
}) => {
  return classNames(
    generateClassNames(styles, {
      button: true,
      [color]: Boolean(color),
      [size]: Boolean(size),
      [variant]: Boolean(variant),
      disabled: Boolean(disabled || isLoading),
      fullWidth: Boolean(fullWidth),
    }),
    className ?? ''
  );
};
