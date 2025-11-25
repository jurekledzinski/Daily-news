import { BoxClassNames } from './types';
import { classNames } from '@helpers';

export const boxClassNames: BoxClassNames = (params) => {
  const { className } = params;

  return classNames(className ?? '');
};
