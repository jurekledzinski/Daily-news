import { CommentInput, FormProps } from './types';
import { ErrorMessage } from '../messages';
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SectionComments.css';

export const FormComment = ({ buttonText, onSubmit }: FormProps) => {
  const formMethods = useForm<CommentInput>();
  const { formState } = formMethods;
  const { errors } = formState;

  return (
    <div className="comment-form">
      <Form
        method="post"
        onSubmit={(event) => {
          formMethods.handleSubmit(onSubmit)(event);
          formMethods.reset();
        }}
        noValidate
      >
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
