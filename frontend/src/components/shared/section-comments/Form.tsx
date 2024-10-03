import { CommentInput } from './types';
import { ErrorMessage } from '../messages';
import { Form } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

export type FormProps = {
  buttonText: string;
  onSubmit: SubmitHandler<CommentInput>;
};

const FormAddComment = ({ buttonText, onSubmit }: FormProps) => {
  const formMethods = useForm<CommentInput>();
  const { formState } = formMethods;
  const { errors } = formState;

  return (
    <div className="comment-form">
      <Form method="post" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <textarea
          cols={40}
          rows={8}
          {...formMethods.register('text', {
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
