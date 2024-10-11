import CommentSection from './CommentSection';
import { SectionCommentsProps } from './types';
import './SectionComments.css';

const SectionComments = ({
  comments,
  children,
  onShowReplies,
  onShowMoreReplies,
  onSubmitLike,
  onShowPreviousReplies,
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
          onShowPreviousReplies={onShowPreviousReplies}
        >
          {children ?? null}
        </CommentSection>
      );
    })}
  </div>
);

export default SectionComments;
