import { FooterProps } from './types';

const Footer = ({ amountReplies, onShowForm, onShowReplies }: FooterProps) => {
  return (
    <div className="comment-panel__footer">
      {amountReplies ? (
        <button className="comment-panel__show-replies" onClick={onShowReplies}>
          Show replies ({amountReplies})
        </button>
      ) : null}
      <button className="comment-panel__reply" onClick={onShowForm}>
        Reply
      </button>
    </div>
  );
};

export default Footer;
