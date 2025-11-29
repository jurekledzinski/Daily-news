import { alertMessageClassNames } from '../../utils/classNames';
import { AlertMessageProps } from './types';

export const AlertMessage = ({ message, ...props }: AlertMessageProps) => {
  const classNames = alertMessageClassNames(props);

  return <p className={classNames}>{message}</p>;
};
