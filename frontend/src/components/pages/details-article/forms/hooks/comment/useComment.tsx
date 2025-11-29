import { CommentFormValues, UseCommentFormProps } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSubmit } from 'react-router';

export const useComment = ({ articleId, onSuccess, status, userId }: UseCommentFormProps) => {
  const methods = useForm<CommentFormValues>({ defaultValues: { text: '', user: '' } });

  const submit = useSubmit();

  const onSubmit: SubmitHandler<CommentFormValues> = (data) => {
    const formData = new FormData();
    formData.append('actionType', 'add-comment');
    formData.set('articleId', articleId);
    formData.set('text', data.text);
    formData.set('user', data.user);
    formData.set('userId', userId);
    submit(formData, { method: 'post' });
  };

  useEffect(() => {
    if (status === 'idle' && methods.formState.isSubmitSuccessful) {
      onSuccess();
      methods.reset();
    }
  }, [methods, onSuccess, status]);

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
