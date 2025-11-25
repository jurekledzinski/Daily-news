import { HTMLAttributes } from 'react';

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  duration?: number;
  portal?: boolean;
  timeout?: number;
  zIndex?: number;
}
