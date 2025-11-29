import { alertIconClassNames } from '../../utils/classNames';
import { AlertIconProps } from './types';
import { Icon } from '@components/shared';

export const AlertIcon = ({ color, icon, size }: AlertIconProps) => {
  const classNames = alertIconClassNames({ color, size });

  return (
    <span className={classNames}>
      <Icon icon={icon} />
    </span>
  );
};
