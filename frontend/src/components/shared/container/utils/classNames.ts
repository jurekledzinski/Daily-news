import { classNames } from '@helpers';
import { ContainerClassNames } from './types';

export const containerClassNames: ContainerClassNames = (params) => {
  const { className } = params;

  return classNames(className ?? '');
};
