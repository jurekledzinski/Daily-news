import { ButtonHTMLAttributes } from 'react';

export interface TabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'> {
  label: string;
}
