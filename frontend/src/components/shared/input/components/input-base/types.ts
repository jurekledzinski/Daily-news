import { FieldsetHTMLAttributes } from 'react';
import { InputVariant, Size } from '@types';

export interface InputBaseProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  isError?: boolean;
  label?: string;
  size?: Size;
  variant?: InputVariant;
}
