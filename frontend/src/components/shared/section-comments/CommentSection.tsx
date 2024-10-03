import { useState } from 'react';
import { CommentPanel, Content, Footer, Header, SectionCommentsProps } from '.';

export type CommentSectionProps = Omit<SectionCommentsProps, 'comments'> & {
  comment: SectionCommentsProps['comments'][0];
  className?: string;
  children: (commentId: string) => React.ReactNode | null;
};

const CommentSection = ({
  className,
  comment,
  onLikes,
  children,
}: CommentSectionProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={['comment-section', className].join(' ')}>
      <CommentPanel key={comment.id}>
        <Header
          commentId={comment.id ?? ''}
          likes={comment.likes}
          user={comment.user}
          onLikes={onLikes}
        />
        <Content text={comment.text} />
        <Footer
          amountReplies={comment.replies?.length}
          onShowForm={() => {
            setShowForm((prev) => !prev);
          }}
          onShowReplies={() => {
            setShowReplies((prev) => !prev);
          }}
        />
      </CommentPanel>

      {showForm ? children(comment.id) : null}

      {showReplies &&
        comment.replies &&
        comment.replies.map((reply) => (
          <CommentSection
            key={reply.id}
            className="nested"
            comment={{ ...reply }}
            onLikes={onLikes}
          >
            {children}
          </CommentSection>
        ))}
    </div>
  );
};

export default CommentSection;
