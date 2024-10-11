import { AiOutlineLike } from 'react-icons/ai';
import { getValueLike, setLikes } from '../../../helpers';
import { Form } from 'react-router-dom';

import { useState } from 'react';
import { ILikes } from '../../../api';

type ButtonLikesProps = {
  commentId: string;
  likes: string;
  onSubmitLike: (data: ILikes) => void;
  parentCommentId: string | null;
};

const ButtonLikes = ({
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

export default ButtonLikes;
