import { Icon, InputVariant, Size } from '@types';
import { InputHTMLAttributes, MouseEventHandler } from 'react';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onClick'> {
  endIcon?: Icon | string;
  isError?: boolean;
  isPending?: boolean;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: Size;
  startIcon?: Icon;
  variant?: InputVariant;
}
