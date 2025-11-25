import { BoxProps } from '../types';

type Params = Omit<BoxProps, 'children'>;

export type BoxClassNames = (params: Params) => string | undefined;
