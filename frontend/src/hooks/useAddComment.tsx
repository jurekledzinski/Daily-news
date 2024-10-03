import { CommentInput } from '../components/shared';
import { useSubmit } from 'react-router-dom';

type UseAddCommentProps = {
  artId: string | undefined;
  user: string;
  userId: string;
};

export const useAddComment = ({ artId, user, userId }: UseAddCommentProps) => {
  const submit = useSubmit();

  const onSubmit = (data: CommentInput, commentId?: string) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('createdAt', new Date().toISOString());
    formData.append('parentCommentId', commentId ?? 'null');
    formData.append('user', user);
    formData.append('userId', userId);
    formData.append('idArticle', artId ?? '');
    formData.append('likes', '0');

    submit(formData, { method: 'post' });
  };

  return onSubmit;
};
