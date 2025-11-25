import styles from '../IconButton.module.css';
import { classNames, generateClassNames } from '@helpers';
import { IconButtonClassNames } from './types';

export const iconButtonClassNames: IconButtonClassNames = ({
  className,
  contrast,
  color = 'primary',
  disabled,
  fullWidth,
  isLoading,
  size = 'size-md',
  variant = 'contained',
}) => {
  return classNames(
    generateClassNames(styles, {
      iconButton: true,
      [color]: Boolean(color),
      [size]: Boolean(size),
      [variant]: Boolean(variant),
      [`${color}-contrast`]: Boolean(contrast),
      disabled: Boolean(disabled || isLoading),
      fullWidth: Boolean(fullWidth),
    }),
    className ?? ''
  );
};
