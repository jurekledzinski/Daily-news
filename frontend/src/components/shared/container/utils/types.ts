import { ContainerProps } from '../types';

type Params = Omit<ContainerProps, 'as' | 'children'>;

export type ContainerClassNames = (params: Params) => string | undefined;
