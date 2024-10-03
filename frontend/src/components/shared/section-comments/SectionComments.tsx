import CommentSection from './CommentSection';
import './SectionComments.css';
import { SectionCommentsProps } from './types';

const SectionComments = ({
  comments,
  onLikes,
  onReply,
}: SectionCommentsProps) => {
  return (
    <div className="section-comments">
      {comments.map((comment) => {
        return (
          <CommentSection
            key={comment.id}
            comment={comment}
            onLikes={onLikes}
            onReply={onReply}
          />
        );
      })}
    </div>
  );
};

export default SectionComments;
