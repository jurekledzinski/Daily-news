import { CommentSection } from './CommentSection';
import { SectionCommentsProps } from './types';
import './SectionComments.css';

export const SectionComments = ({
  comments,
  children,
  onShowReplies,
  onShowMoreReplies,
  onSubmitLike,
}: SectionCommentsProps) => (
  <div className="section-comments">
    {comments.map((comment) => {
      return (
        <CommentSection
          key={comment.id}
          comment={comment}
          onShowReplies={onShowReplies}
          onShowMoreReplies={onShowMoreReplies}
          onSubmitLike={onSubmitLike}
        >
          {children ?? null}
        </CommentSection>
      );
    })}
  </div>
);
