import { Form } from 'react-router-dom';
import { getValueLike, setLikes } from '../../../helpers';
import { Likes } from '../../../api';
import { useState } from 'react';
import './SectionComments.css';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <span className="comment-panel__icon">
          <FontAwesomeIcon icon={faThumbsUp} />
        </span>
        <span className="comment-panel__like">{likes}</span>
      </button>
    </Form>
  );
};
