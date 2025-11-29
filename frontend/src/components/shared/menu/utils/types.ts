import { Size } from '@types';

type ParamsMenu = {
  className?: string;
  size?: Size;
};

type ParamsMenuItem = {
  className?: string;
  type?: 'link';
};

export type MenuClassNames = (params: ParamsMenu) => string | undefined;
export type MenuItemClassNames = (params: ParamsMenuItem) => string | undefined;
