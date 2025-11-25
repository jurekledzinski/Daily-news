import { HTMLAttributes } from 'react';
import { Orientation } from '@types';

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation;
}
