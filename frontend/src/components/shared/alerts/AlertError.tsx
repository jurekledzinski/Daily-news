import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Alerts.css';

type AlertErrorProps = {
  children?: React.ReactNode;
  className?: string;
};

export const AlertError = ({ className, children }: AlertErrorProps) => {
  return (
    <div className={['alert-error', className].filter(Boolean).join(' ')}>
      <span className="alert-error__icon">
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
      <p className="alert-error__text">{children}</p>
    </div>
  );
};
