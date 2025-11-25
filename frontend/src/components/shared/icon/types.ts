import { Color } from '@types';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export interface IconProps extends FontAwesomeIconProps {
  className?: string;
  color?: Color;
}
