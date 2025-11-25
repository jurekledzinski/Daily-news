import { BaseButtonProps, LinkButtonProps } from '../types';

type OmitKeys = 'iconEnd' | 'iconStart' | 'label';

export type ButtonParams = Omit<BaseButtonProps, OmitKeys>;
export type LinkButtonParams = Omit<LinkButtonProps, OmitKeys>;

export type ButtonClassNames = (params: ButtonParams) => string | undefined;
