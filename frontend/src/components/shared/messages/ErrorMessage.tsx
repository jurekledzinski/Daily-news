import { ErrorMessageProps } from './types';
import './Messages.css';

export const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return <p className="error">{text}</p>;
};
