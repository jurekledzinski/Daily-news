import { buttonGroupClassNames } from './utils';
import { ButtonGroupProps } from './types';

export const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => {
  const classNames = buttonGroupClassNames(props);

  return (
    <div aria-label="Button group" className={classNames} role="group">
      {children}
    </div>
  );
};
