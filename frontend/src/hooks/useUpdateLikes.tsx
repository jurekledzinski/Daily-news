import { Likes } from '../api';
import { useSubmit } from 'react-router-dom';

type UseUpdateLikesProps = {
  onLikes: (data: Likes) => void;
};

export const useUpdateLikes = ({ onLikes }: UseUpdateLikesProps) => {
  const submit = useSubmit();

  const onSubmit = (data: Likes) => {
    const formData = new FormData();
    formData.append('actionType', 'update-likes');
    formData.set('likes', data.likes.toString());
    formData.set('commentId', data.commentId);
    formData.set('parentCommentId', data.parentCommentId!);

    submit(formData, { method: 'post' });
    onLikes(data);
  };

  return onSubmit;
};
