import { CardProps } from './types';

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};
