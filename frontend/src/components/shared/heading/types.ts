import { FontWeightClass } from '@types';

export type HeadingProps = {
  children?: React.ReactNode;
  className?: string;
  fw?: FontWeightClass;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};
