import { ErrorMessage } from '../../../shared/messages';
import { Form } from 'react-router-dom';
import { LoginFormProps } from './types';
import { AlertError } from '../../../shared';

export const LoginForm = ({
  id,
  onSubmit,
  methods,
  serverError,
}: LoginFormProps) => {
  const { errors } = methods.formState;

  return (
    <Form id={id} onSubmit={onSubmit} method="POST" noValidate>
      <fieldset>
        <label>Email:</label>
        <input
          type="text"
          {...methods.register('email', {
            required: { message: 'Email is required', value: true },
            pattern: {
              message: 'Email is invalid',
              value: /\S+@\S+\.\S+/,
            },
          })}
        />
        {errors.email && <ErrorMessage> {errors.email.message}</ErrorMessage>}
      </fieldset>
      <fieldset>
        <label>Password:</label>
        <input
          type="password"
          {...methods.register('password', {
            required: { message: 'Password is required', value: true },
          })}
        />
        {errors.password && (
          <ErrorMessage> {errors.password.message}</ErrorMessage>
        )}
      </fieldset>
      {serverError && <AlertError> {serverError}</AlertError>}
    </Form>
  );
};
