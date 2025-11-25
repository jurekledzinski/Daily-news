import { iconControlLayoutClassNames } from '../../utils';
import { Loader } from '@components/shared';
import { useControlLayout } from '../../store';

export const IconLoader = () => {
  const ctx = useControlLayout();
  const classNames = iconControlLayoutClassNames({ ...ctx, type: 'endIcon' });

  if (!ctx.isPending) return null;

  return (
    <div className={classNames}>
      <Loader size={ctx.size} position="element" />
    </div>
  );
};
