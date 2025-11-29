import { menuClassNames } from '../../utils';
import { MenuProps } from './types';

export const Menu = ({ children, className, size }: MenuProps) => {
  const classNames = menuClassNames({ className, size });

  return <ul className={classNames}>{children}</ul>;
};
