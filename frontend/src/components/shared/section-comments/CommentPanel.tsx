const CommentPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="comment-panel">{children}</div>
    </>
  );
};

export default CommentPanel;
