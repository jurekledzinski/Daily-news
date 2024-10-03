import { useState } from 'react';
import { CommentPanelProps, Content, Footer, Form, Header } from '.';

const CommentPanel = ({
  comment,
  onLikes,
  onReply,
  onShowReplies,
  onShowRepliesOnSubmit,
}: CommentPanelProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="comment-panel">
        <Header
          commentId={comment.id}
          likes={comment.likes}
          userFrom={comment.userFrom}
          userTo={comment.userTo}
          onLikes={onLikes}
        />
        <Content text={comment.text} />
        <Footer
          amountReplies={comment.replies?.length}
          onShowForm={() => {
            setShowForm((prev) => !prev);
          }}
          onShowReplies={onShowReplies}
        />
      </div>
      {showForm && (
        <Form
          buttonText="Reply to comment"
          onSubmit={(value) => {
            console.log('');
            onReply(comment.id, value.text, comment.userFrom);
            onShowRepliesOnSubmit && onShowRepliesOnSubmit();
            setShowForm(false);
          }}
        />
      )}
    </>
  );
};

export default CommentPanel;
