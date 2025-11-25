import { Button } from '@components/shared';
import { tabClassNames } from '../../utils';
import { TabProps } from './types';
import { useTabs } from '../../store';

export const Tab = ({ label, ...props }: TabProps) => {
  const { color, selectedKey, size, onSelectChange, variant } = useTabs();
  const classNames = tabClassNames({ color, id: props.id, selectedKey, variant });

  return (
    <Button
      {...props}
      className={classNames}
      color={color}
      label={label}
      onClick={() => onSelectChange && onSelectChange(props.id!)}
      role="tab"
      size={size}
      type="button"
      variant={variant}
    />
  );
};
