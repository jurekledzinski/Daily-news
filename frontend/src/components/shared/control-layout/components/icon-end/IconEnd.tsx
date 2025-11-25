import { Icon } from '@components/shared';
import { iconControlLayoutClassNames } from '../../utils';
import { IconEndProps } from './types';
import { useControlLayout } from '../../store';

export const IconEnd = ({ className, icon, ...props }: IconEndProps) => {
  const ctx = useControlLayout();
  const classNames = iconControlLayoutClassNames({ ...ctx, type: 'endIcon', className });

  if (ctx.isPending || (ctx.isError !== undefined && ctx.isStatus)) return null;

  return (
    <button {...props} className={classNames}>
      {typeof icon === 'string' ? icon : <Icon icon={icon} size="1x" />}
    </button>
  );
};
