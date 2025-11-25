import { CardFooterProps } from './types';

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return <footer className={className}>{children}</footer>;
};
