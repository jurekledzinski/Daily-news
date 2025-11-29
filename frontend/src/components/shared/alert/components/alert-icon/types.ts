import { Color, Icon, Size } from '@types';

export type AlertIconProps = {
  color?: Color | 'info';
  icon: Icon;
  size?: Omit<Size, 'size-md' | 'size-lg'>;
};
