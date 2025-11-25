import { CardContentProps } from './types';

export const CardContent = ({ children, ...props }: CardContentProps) => {
  return <div {...props}>{children}</div>;
};
