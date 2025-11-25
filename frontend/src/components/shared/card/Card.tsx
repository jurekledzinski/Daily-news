import { CardProps } from './types';

export const Card = ({ children, className }: CardProps) => {
  return <div className={className}>{children}</div>;
};
