import { ButtonHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IconStartProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProp;
}
