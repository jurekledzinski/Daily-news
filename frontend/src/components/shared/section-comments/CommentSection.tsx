import { useState } from 'react';
import { CommentPanel, Content, Footer, Header, CommentSectionProps } from '.';

const CommentSection = ({
  className,
  comment,
  children,
  onShowReplies,
  onShowMoreReplies,
  onShowPreviousReplies,
  onSubmitLike,
}: CommentSectionProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={['comment-section', className].join(' ')}>
      <CommentPanel key={comment.id}>
        <Header
          commentId={comment.id}
          likes={comment.likes}
          user={comment.user}
          parentCommentId={comment.parentCommentId}
          onSubmitLike={onSubmitLike}
        />

        <Content text={comment.text} />

        <Footer
          amountReplies={comment.replyCount ?? 0}
          onShowForm={() => {
            setShowForm((prev) => !prev);
          }}
          onShowReplies={() => {
            setShowReplies((prev) => !prev);
            onShowReplies(comment.id);
          }}
        />
      </CommentPanel>

      {showForm && children ? children(comment.id) : null}

      {showReplies &&
        comment.replies &&
        comment.replies.map((reply) => (
          <CommentSection
            key={reply.id}
            className="nested"
            comment={reply}
            onShowReplies={onShowReplies}
            onShowMoreReplies={onShowMoreReplies}
            onSubmitLike={onSubmitLike}
            onShowPreviousReplies={onShowPreviousReplies}
          >
            {children ?? null}
          </CommentSection>
        ))}

      {showReplies &&
      comment.pageReply &&
      comment.totalReplyPages &&
      comment.pageReply < comment.totalReplyPages &&
      comment.replyCount !== comment.replies?.length ? (
        <button
          onClick={() => {
            if (!comment.replies) return;
            if (comment.pageReply === comment.totalReplyPages) return;
            onShowMoreReplies(comment.id, comment.pageReply ?? 1);
          }}
        >
          Show more comments
        </button>
      ) : null}
    </div>
  );
};

export default CommentSection;
