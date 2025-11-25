import { fieldClassNames } from './utils';
import { FiledProps } from './types';

export const Field = ({ className, children, ...props }: FiledProps) => {
  const classNames = fieldClassNames({ className });

  return (
    <div {...props} className={classNames}>
      {children}
    </div>
  );
};
