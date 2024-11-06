import { InfoMessageProps } from './types';
import './Messages.css';

export const InfoMessage = ({ className, children }: InfoMessageProps) => {
  return (
    <div className={['info-message', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};
