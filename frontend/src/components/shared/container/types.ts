import { ElementType } from 'react';

export type ContainerProps<T extends ElementType = 'div'> = {
  //   as?: 'div' | 'main' | 'section';
  as?: T;
  children?: React.ReactNode;
  className?: string;
};
