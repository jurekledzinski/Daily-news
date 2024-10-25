import { AlertError, ErrorMessage } from '../../../shared';
import { RegisterFormProps } from './types';

export const RegisterForm = ({
  id,
  onSubmit,
  methods,
  serverError,
}: RegisterFormProps) => {
  const { errors } = methods.formState;

  return (
    <form id={id} onSubmit={onSubmit} noValidate>
      <fieldset>
        <label>Name:</label>
        <input
          type="text"
          {...methods.register('name', {
            required: { message: 'Name is required', value: true },
            minLength: {
              message: 'Name minimum length characters is 2',
              value: 2,
            },
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message} </ErrorMessage>}
      </fieldset>
      <fieldset>
        <label>Email:</label>
        <input
          type="email"
          {...methods.register('email', {
            required: { message: 'Email is required', value: true },
            pattern: {
              message: 'Email is invalid',
              value: /\S+@\S+\.\S+/,
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </fieldset>
      <fieldset>
        <label>Password:</label>
        <input
          type="password"
          {...methods.register('password', {
            required: { message: 'Password is required', value: true },
            minLength: {
              message: 'Password required at least 8 characters',
              value: 8,
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </fieldset>
      <fieldset>
        <label>Confrim password:</label>
        <input
          type="confirmPassword"
          {...methods.register('confirmPassword', {
            required: { message: 'Confirm password is required', value: true },
            minLength: {
              message: 'Confirm password required at least 8 characters',
              value: 8,
            },
            validate: (value, formValues) => {
              return (
                formValues.password === value || "Passwords aren't the same"
              );
            },
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
      </fieldset>
      {serverError && <AlertError> {serverError}</AlertError>}
    </form>
  );
};
