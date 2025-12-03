import { Button, ButtonGroup, Field, Form, Message, PasswordInput } from '@components/shared';
import { UserPasswordFormProps } from './types';

export const UserPasswordForm = ({ controls, isPending, onSubmit }: UserPasswordFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form className="g-sm" onSubmit={onSubmit} noValidate>
      <Field>
        <PasswordInput
          autoComplete="new-password"
          label="Password"
          {...register('password', { required: 'Password is required' })}
          variant="outlined"
        />
        {errors.password && <Message>{errors.password.message}</Message>}
      </Field>
      <Field>
        <PasswordInput
          autoComplete="current-password"
          label="Confirm password"
          {...register('confirmPassword', { required: 'Confirm password is required' })}
          variant="outlined"
        />
        {errors.confirmPassword && <Message>{errors.confirmPassword.message}</Message>}
      </Field>
      <ButtonGroup justify="justify-end" fullWidth>
        <Button label="Update profile" isLoading={isPending} type="submit" />
      </ButtonGroup>
    </Form>
  );
};
