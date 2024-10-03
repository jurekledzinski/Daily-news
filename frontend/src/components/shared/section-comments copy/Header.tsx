import { HeaderProps } from '.';
import { AiOutlineLike } from 'react-icons/ai';
import { TbMessageForward } from 'react-icons/tb';

const Header = ({
  commentId,
  likes,
  userFrom,
  userTo,
  onLikes,
}: HeaderProps) => {
  return (
    <div className="comment-panel__header">
      <strong className="comment-panel__title">
        {userFrom} {userTo ? <TbMessageForward /> : null} {userTo}
      </strong>
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
