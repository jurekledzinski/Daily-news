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
      <strong className="comment-panel__title">
        {user} <p>CommentID: {commentId}</p>
        <p>ParentCommentID: {parentCommentId ? parentCommentId : 'null'}</p>
      </strong>
      <ButtonLikes
        commentId={commentId}
        likes={likes}
        onSubmitLike={onSubmitLike}
        parentCommentId={parentCommentId}
      />
    </div>
  );
};
