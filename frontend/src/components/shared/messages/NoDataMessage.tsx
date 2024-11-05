import { NoDataMessageProps } from './types';
import './Messages.css';

export const NoDataMessage = ({ children, className }: NoDataMessageProps) => {
  return (
    <div className={['no-data', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};
