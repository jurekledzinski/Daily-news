import { AiOutlineLike } from 'react-icons/ai';
import { Form } from 'react-router-dom';
import { getValueLike, setLikes } from '../../../helpers';
import { Likes } from '../../../api';
import { useState } from 'react';

type ButtonLikesProps = {
  commentId: string;
  likes: string;
  onSubmitLike: (data: Likes) => void;
  parentCommentId: string | null;
};

export const ButtonLikes = ({
  commentId,
  likes,
  onSubmitLike,
  parentCommentId,
}: ButtonLikesProps) => {
  const [localLikes, setLocalLikes] = useState(getValueLike(commentId));

  return (
    <Form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitLike({ commentId, likes: localLikes, parentCommentId });
        setLikes(commentId);
        const updatedLike = getValueLike(commentId);
        setLocalLikes(updatedLike);
      }}
    >
      <button className="comment-panel__likes" type="submit">
        <AiOutlineLike /> ({likes})
      </button>
    </Form>
  );
};
