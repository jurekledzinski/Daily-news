import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import { CommentInput, FormProps } from './types';
import { ErrorMessage } from '../messages';

const FormAddComment = ({ buttonText }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentInput>();

  const submit = useSubmit();

  const onSubmit = (data: CommentInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('createdAt', new Date().toISOString());
    formData.append('parentCommentId', 'null');
    formData.append('user', 'Bob');
    formData.append('userId', '123');
    formData.append('idArticle', '444');
    formData.append('likes', '44');

    submit(formData, { method: 'post' });
    reset();
  };

  return (
    <div className="comment-form">
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          cols={40}
          rows={8}
          {...register('text', {
            required: { message: 'Comment is required', value: true },
          })}
        />
        {errors.text && <ErrorMessage>{errors.text.message}</ErrorMessage>}
        <button type="submit">{buttonText}</button>
      </Form>
    </div>
  );
};

export default FormAddComment;
