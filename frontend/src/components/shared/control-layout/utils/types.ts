import { ControlLayoutProps } from '../types';

type BaseParmas = Omit<ControlLayoutProps, 'children'>;
type IconControlLayoutParams = BaseParmas & { type: 'startIcon' | 'endIcon' };

export type ControlLayoutClassNames = (params: BaseParmas) => string | undefined;
export type IconControlLayoutClassNames = (params: IconControlLayoutParams) => string | undefined;
