import { Icon, InputVariant, Size } from '@types';
import { MouseEventHandler, TextareaHTMLAttributes } from 'react';

export interface TextareaInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onClick'> {
  endIcon?: Icon;
  isError?: boolean;
  isPending?: boolean;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: Size;
  startIcon?: Icon;
  variant?: InputVariant;
}
