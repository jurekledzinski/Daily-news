import { Color, Variant } from '@types';

export type Params = {
  color?: Color;
  id?: string;
  selectedKey?: string;
  variant?: Variant;
};

export type TabClassNames = (params: Params) => string;
