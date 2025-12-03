import { Button, ButtonGroup, Field, Form, Message, TextareaInput, TextInput } from '@components/shared';
import { CommentFormProps } from './types';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

export const CommentForm = ({ controls, isPending, onSubmit }: CommentFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form className="g-sm" id="loginForm" onSubmit={onSubmit} noValidate>
      <Field>
        <TextInput
          {...register('user', { required: 'Name is required' })}
          autoComplete="username"about=''
          label="Name"
          variant="outlined"
        />
        {errors.user && <Message>{errors.user.message}</Message>}
      </Field>
      <Field>
        <TextareaInput
          {...register('text', { required: 'Comment is required' })}
          autoComplete="comment"
          label="Comment"
          rows={5}
          variant="outlined"
        />
        {errors.text && <Message>{errors.text.message}</Message>}
      </Field>
      <ButtonGroup fullWidth justify="justify-end">
        <Button isLoading={isPending} iconEnd={[faCommentAlt]} label="Add comment" type="submit" />
      </ButtonGroup>
    </Form>
  );
};
