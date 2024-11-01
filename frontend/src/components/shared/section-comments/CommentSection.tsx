import { CommentPanel, CommentSectionProps, Content, Footer, Header } from '.';
import { useState } from 'react';
import './SectionComments.css';

export const CommentSection = ({
  className,
  comment,
  children,
  onShowReplies,
  onShowMoreReplies,
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
          createdAt={comment.createdAt}
          children={children}
          onShowForm={() => {
            setShowForm((prev) => !prev);
          }}
          onShowReplies={() => {
            setShowReplies((prev) => !prev);
            onShowReplies(comment.id);
          }}
        />
      </CommentPanel>

      {showForm && children
        ? children(comment.id, () => {
            setShowForm(false);
            setShowReplies(true);
          })
        : null}

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
