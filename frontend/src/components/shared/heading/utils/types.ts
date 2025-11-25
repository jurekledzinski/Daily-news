import { HeadingProps } from '../types';

type Params = Omit<HeadingProps, 'children'>;

export type HeadingClassNames = (params: Params) => string | undefined;
