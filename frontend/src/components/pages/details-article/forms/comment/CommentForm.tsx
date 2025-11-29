import { CommentFormProps } from './types';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  ButtonGroup,
  Field,
  Form,
  Message,
  TextInput,
  TextareaInput,
} from '@components/shared';

export const CommentForm = ({ controls, isPending, onSubmit }: CommentFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form className="g-sm" id="loginForm" onSubmit={onSubmit} noValidate>
      <Field>
        <TextInput
          autoComplete="username"
          label="Name"
          {...register('user', { required: 'Name is required' })}
          isPending={isPending}
          variant="outlined"
        />
        {errors.user && <Message>{errors.user.message}</Message>}
      </Field>
      <Field>
        <TextareaInput
          autoComplete="comment"
          label="Comment"
          {...register('text', { required: 'Comment is required' })}
          isPending={isPending}
          rows={5}
          variant="outlined"
        />
        {errors.text && <Message>{errors.text.message}</Message>}
      </Field>
      <ButtonGroup fullWidth justify="justify-end">
        <Button iconEnd={[faCommentAlt]} label="Add comment" type="submit" />
      </ButtonGroup>
    </Form>
  );
};
