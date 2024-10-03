import CommentSection from './CommentSection';
import './SectionComments.css';
import { CommentWithReplies } from './types';

export type SectionCommentsProps = {
  comments: CommentWithReplies[];
  onLikes: (commentId: string) => void;
  children: (commentId: string) => React.ReactNode;
};

const SectionComments = ({
  comments,
  onLikes,
  children,
}: SectionCommentsProps) => (
  <div className="section-comments">
    {comments.map((comment) => {
      return (
        <CommentSection key={comment.id} comment={comment} onLikes={onLikes}>
          {children}
        </CommentSection>
      );
    })}
  </div>
);

export default SectionComments;
