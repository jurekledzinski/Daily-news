import { alertClassNames } from './utils';
import { AlertProps } from './types';
import { useAlert } from './hooks';

export const Alert = ({ children, ...props }: AlertProps) => {
  const classNames = alertClassNames(props);
  const childs = useAlert({ children });

  return <div className={classNames}>{childs}</div>;
};
