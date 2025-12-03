import { CommentFormValues, UseCommentFormProps } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetForm } from '@hooks';
import { useSubmit } from 'react-router';

export const useComment = ({
  action,
  articleId,
  onFailed,
  onSuccess,
  status,
  userId,
  token,
}: UseCommentFormProps) => {
  const methods = useForm<CommentFormValues>({ defaultValues: { text: '', user: '' } });

  const submit = useSubmit();

  const onSubmit: SubmitHandler<CommentFormValues> = (data) => {
    if (!articleId || !token || !userId) return;
    const formData = new FormData();
    formData.append('actionType', 'create-comment');
    formData.set('articleId', articleId);
    formData.set('text', data.text);
    formData.set('user', data.user);
    formData.set('userId', userId);
    formData.set('csrfToken', token);
    submit(formData, { method: 'post' });
  };

  useResetForm({
    isSubmitSuccessful: methods.formState.isSubmitSuccessful,
    isSuccess: !!action?.success,
    onFailed,
    onSuccess,
    reset: methods.reset,
    state: status.state,
  });

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
