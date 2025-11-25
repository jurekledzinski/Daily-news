import { containerClassNames } from './utils';
import { ContainerProps } from './types';

export const Container = ({ as = 'div', children, ...props }: ContainerProps) => {
  const Tag = `${as}` as keyof JSX.IntrinsicElements;
  const classNames = containerClassNames(props);

  return (
    <Tag {...props} className={classNames}>
      {children}
    </Tag>
  );
};
