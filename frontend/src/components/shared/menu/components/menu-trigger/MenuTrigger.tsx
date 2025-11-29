import { MenuTriggerProps } from './types';
import { useMenuTrigger } from '../../hooks';

export const MenuTrigger = ({ ...props }: MenuTriggerProps) => {
  const menuChildren = useMenuTrigger(props);

  return <>{menuChildren}</>;
};
