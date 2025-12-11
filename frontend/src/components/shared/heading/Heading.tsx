import { headingClassNames } from './utils';
import { HeadingProps } from './types';
import { JSX } from 'react';

export const Heading = ({ children, level = 1, ...props }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const classes = headingClassNames({ level, ...props });

  return <Tag className={classes}>{children}</Tag>;
};
