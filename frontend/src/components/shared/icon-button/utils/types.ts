import { IconBaseButtonProps, IconLinkButtonProps } from '../types';

export type IconButtonParams = Omit<IconBaseButtonProps, 'icon'>;
export type IconLinkButtonParams = Omit<IconLinkButtonProps, 'icon'>;

export type IconButtonClassNames = (params: IconButtonParams) => string | undefined;
