import styles from '../Alert.module.css';
import { AlertClassNames, AlertIconClassNames, AlertMessageClassNames } from './types';
import { classNames, generateClassNames } from '@helpers';

export const alertClassNames: AlertClassNames = (params) => {
  const { className, color, fullWidth, orientation, variant = 'contained' } = params;

  return classNames(
    generateClassNames(styles, {
      alert: true,
      fullWidth: Boolean(fullWidth),
      [`${color}`]: Boolean(color),
      [`${orientation}`]: Boolean(orientation),
      [`${variant}`]: Boolean(variant),
    }),
    className ?? ''
  );
};

export const alertIconClassNames: AlertIconClassNames = (params) => {
  const { color, size = 'size-xs' } = params;

  return generateClassNames(styles, {
    icon: true,
    [`${color}`]: Boolean(color),
    [`${size}`]: Boolean(size),
  });
};

export const alertMessageClassNames: AlertMessageClassNames = (params) => {
  const { size = 'size-xs' } = params;

  return generateClassNames(styles, {
    message: true,
    [`${size}`]: Boolean(size),
  });
};
