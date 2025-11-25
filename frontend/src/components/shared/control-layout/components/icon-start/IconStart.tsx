import { Icon } from '@components/shared';
import { iconControlLayoutClassNames } from '../../utils';
import { IconStartProps } from './types';
import { useControlLayout } from '../../store';

export const IconStart = ({ className, icon, ...props }: IconStartProps) => {
  const ctx = useControlLayout();
  const classNames = iconControlLayoutClassNames({ ...ctx, type: 'startIcon', className });

  return (
    <button {...props} className={classNames}>
      <Icon icon={icon} size="1x" />
    </button>
  );
};
