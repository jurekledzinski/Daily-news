import { ErrorMessageProps } from './types';
import './Messages.css';

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="error">{children}</p>;
};
