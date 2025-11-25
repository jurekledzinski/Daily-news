import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@components/shared';
import { iconControlLayoutClassNames } from '../../utils';
import { IconStatusProps } from './types';
import { useControlLayout } from '../../store';

export const IconStatus = ({ icons = [faExclamationCircle, faCheckCircle] }: IconStatusProps) => {
  const ctx = useControlLayout();
  const classNames = iconControlLayoutClassNames({ ...ctx, type: 'endIcon' });

  if (ctx.isPending || ctx.isError === undefined) return null;

  return (
    <span className={classNames}>
      <Icon icon={ctx.isError ? icons[0] : icons[1]} size="1x" />
    </span>
  );
};
