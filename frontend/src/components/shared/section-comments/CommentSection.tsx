import { useState } from 'react';
import { CommentPanel, CommentSectionProps } from '.';

const CommentSection = ({
  className,
  comment,
  onLikes,
  onReply,
}: CommentSectionProps) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className={['comment-section', className].join(' ')}>
      <CommentPanel
        key={comment.id}
        comment={comment}
        onLikes={onLikes}
        onReply={onReply}
        onShowReplies={() => {
          setShowReplies((prev) => !prev);
        }}
        onShowRepliesOnSubmit={() => {
          setShowReplies(true);
        }}
      />
      {showReplies &&
        comment.replies &&
        comment.replies.map((reply) => (
          <CommentSection
            key={reply.id}
            className="nested"
            comment={{ ...reply }}
            onLikes={onLikes}
            onReply={onReply}
          />
        ))}
    </div>
  );
};

export default CommentSection;
