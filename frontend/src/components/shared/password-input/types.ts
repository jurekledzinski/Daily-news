import { Icons, InputVariant, Size } from '@types';
import { InputHTMLAttributes } from 'react';

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onClick'> {
  disabled?: boolean;
  endIcon?: Icons;
  isError?: boolean;
  isPending?: boolean;
  label?: string;
  readOnly?: boolean;
  size?: Size;
  startIcon?: Icons;
  variant?: InputVariant;
}
