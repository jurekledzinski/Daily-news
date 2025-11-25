import styles from '../ButtonGroup.module.css';
import { ButtonGroupClassNames } from './types';
import { classNames, generateClassNames } from '@helpers';

export const buttonGroupClassNames: ButtonGroupClassNames = (params) => {
  const { aligment, className, justify, fullWidth, orientation, spacing } = params;

  return classNames(
    generateClassNames(styles, {
      'button-group': true,
      [`${aligment}`]: Boolean(aligment),
      [`full-width`]: Boolean(fullWidth),
      [`${justify}`]: Boolean(justify),
      [`${orientation}`]: Boolean(orientation),
      [`${spacing}`]: Boolean(spacing),
    }),
    className ?? ''
  );
};
