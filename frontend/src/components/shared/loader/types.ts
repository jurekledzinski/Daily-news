import { Border, Size } from '@types';
import { HTMLAttributes } from 'react';

export interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
  border?: Border;
  colorSpin?: string;
  colorTrack?: string;
  position?: 'element' | 'viewport';
  size?: Size | number;
}
