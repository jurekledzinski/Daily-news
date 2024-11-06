import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FooterProps } from './types';
import { formatDistanceToNow } from 'date-fns';
import './SectionComments.css';

export const Footer = ({
  amountReplies,
  createdAt,
  children,
  onShowForm,
  onShowReplies,
}: FooterProps) => {
  return (
    <div className="comment-panel__footer">
      <p className="comment-panel__time">
        {formatDistanceToNow(new Date(createdAt))} ago
      </p>
      <div className="comment-panel__buttons">
        {amountReplies ? (
          <button
            className="comment-panel__show-replies"
            onClick={onShowReplies}
          >
            Show replies ({amountReplies})
          </button>
        ) : null}
        {children && (
          <button className="comment-panel__reply" onClick={onShowForm}>
            <span className="comment-panel__icon-reply">
              <FontAwesomeIcon icon={faReply} />
            </span>
            <span className="comment-panel__reply-text">Reply</span>
          </button>
        )}
      </div>
    </div>
  );
};
