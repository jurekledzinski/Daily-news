import { ButtonLikes, HeaderProps } from '.';
import './SectionComments.css';

export const Header = ({
  commentId,
  likes,
  parentCommentId,
  user,
  onSubmitLike,
}: HeaderProps) => {
  return (
    <div className="comment-panel__header">
      <strong className="comment-panel__title">{user}</strong>
      <ButtonLikes
        commentId={commentId}
        likes={likes}
        onSubmitLike={onSubmitLike}
        parentCommentId={parentCommentId}
      />
    </div>
  );
};
