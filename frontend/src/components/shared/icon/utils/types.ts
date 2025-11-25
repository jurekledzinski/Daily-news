import { Color } from '@types';

type Params = {
  className?: string;
  color?: Color;
};

export type IconClassNames = (params: Params) => string | undefined;
