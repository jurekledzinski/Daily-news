import { FooterProps } from './types';

export const Footer = ({
  amountReplies,
  onShowForm,
  onShowReplies,
}: FooterProps) => {
  const isLogged = document.cookie.split('=').includes('time');
  return (
    <div className="comment-panel__footer">
      {amountReplies ? (
        <button className="comment-panel__show-replies" onClick={onShowReplies}>
          Show replies ({amountReplies})
        </button>
      ) : null}
      {isLogged && (
        <button className="comment-panel__reply" onClick={onShowForm}>
          Reply
        </button>
      )}
    </div>
  );
};
