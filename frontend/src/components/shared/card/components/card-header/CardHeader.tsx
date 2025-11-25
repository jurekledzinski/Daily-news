import { CardHeaderProps } from './types';

export const CardHeader = ({ children, ...props }: CardHeaderProps) => {
  return <div {...props}>{children}</div>;
};
