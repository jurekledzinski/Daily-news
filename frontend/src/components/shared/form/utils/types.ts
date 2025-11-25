import { Orientation } from '@types';

type Params = {
  className?: string;
  orientation?: Orientation;
};

export type FormClassNames = (params: Params) => string | undefined;
export type FormGroupClassNames = (params: Params) => string | undefined;
