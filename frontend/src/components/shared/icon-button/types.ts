import { Color, Icons, Size, Variant } from '@types';

export type IconBaseButtonProps = {
  icon: Icons;
  className?: string;
  color?: Color;
  contrast?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  size?: Size | 'size-xxs';
  variant?: Variant | 'minimal';
};

export interface IconButtonProps
  extends IconBaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export interface IconLinkButtonProps
  extends IconBaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  href: string;
  type?: never;
}
