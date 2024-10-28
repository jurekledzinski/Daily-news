import { FooterProps } from './types';

export const Footer = ({
  amountReplies,
  children,
  onShowForm,
  onShowReplies,
}: FooterProps) => {
  return (
    <div className="comment-panel__footer">
      {amountReplies ? (
        <button className="comment-panel__show-replies" onClick={onShowReplies}>
          Show replies ({amountReplies})
        </button>
      ) : null}
      {children && (
        <button className="comment-panel__reply" onClick={onShowForm}>
          Reply
        </button>
      )}
    </div>
  );
};
