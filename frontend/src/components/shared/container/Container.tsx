import { containerClassNames } from './utils';
import { ContainerProps } from './types';
import { ElementType } from 'react';

export const Container = <T extends ElementType = 'div'>({ as, children, ...props }: ContainerProps<T>) => {
  const Tag = as || 'div';
  const classNames = containerClassNames(props);

  return (
    <Tag {...props} className={classNames}>
      {children}
    </Tag>
  );
};
