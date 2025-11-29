import { menuItemClassNames } from '../../utils';
import { MenuItemProps } from './types';

export const MenuItem = ({ children, className, type, ...props }: MenuItemProps) => {
  const classNames = menuItemClassNames({ className, type });

  return (
    <li className={classNames} {...props}>
      {children}
    </li>
  );
};
