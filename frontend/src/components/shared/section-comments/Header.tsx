import { HeaderProps } from '.';
import { AiOutlineLike } from 'react-icons/ai';

const Header = ({ commentId, likes, user, onLikes }: HeaderProps) => {
  return (
    <div className="comment-panel__header">
      <strong className="comment-panel__title">{user}</strong>
      <button
        className="comment-panel__likes"
        onClick={() => onLikes(commentId)}
      >
        <AiOutlineLike /> ({likes})
      </button>
    </div>
  );
};

export default Header;
