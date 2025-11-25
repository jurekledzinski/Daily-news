import { boxClassNames } from './utils';
import { BoxProps } from './types';

export const Box = ({ children, ...props }: BoxProps) => {
  const classNames = boxClassNames(props);

  return (
    <div {...props} className={classNames}>
      {children}
    </div>
  );
};
