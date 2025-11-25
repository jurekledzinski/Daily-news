import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Color, Icons, Size, Variant } from '@types';

export type BaseButtonProps = {
  className?: string;
  label: string;
  color?: Color;
  disabled?: boolean;
  fullWidth?: boolean;
  iconEnd?: Icons;
  iconStart?: Icons;
  isLoading?: boolean;
  size?: Size;
  variant?: Variant;
};

export interface ButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export interface LinkButtonProps
  extends BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  href: string;
  type?: never;
}
