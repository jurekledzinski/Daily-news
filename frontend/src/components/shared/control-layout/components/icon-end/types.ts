import { ButtonHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IconEndProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProp | string;
}
