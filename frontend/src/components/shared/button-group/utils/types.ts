import { ButtonGroupProps } from '../types';

type Params = Omit<ButtonGroupProps, 'children'>;

export type ButtonGroupClassNames = (params: Params) => string | undefined;
