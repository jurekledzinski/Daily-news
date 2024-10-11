import { useSubmit } from 'react-router-dom';
import { ILikes } from '../api';

type UseUpdateLikesProps = {
  onLikes: (data: ILikes) => void;
};

export const useUpdateLikes = ({ onLikes }: UseUpdateLikesProps) => {
  const submit = useSubmit();

  const onSubmit = (data: ILikes) => {
    console.log('data use update likes', data);
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

//   reset: UseFormReset<CommentInput>;
