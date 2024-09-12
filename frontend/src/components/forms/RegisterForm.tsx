import { useFormContext } from 'react-hook-form';
import { FormResigsterValues, RegisterFormProps } from '../../types';
import { ErrorMessage } from '../messages';

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const methods = useFormContext<FormResigsterValues>();
  const { errors } = methods.formState;

  return (
    <form id="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
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
        {errors.name && <ErrorMessage text={errors.name.message} />}
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
        {errors.email && <ErrorMessage text={errors.email.message} />}
      </fieldset>
      <fieldset>
        <label>Password:</label>
        <input
          type="password"
          {...methods.register('password', {
            required: { message: 'Password is required', value: true },
          })}
        />
        {errors.password && <ErrorMessage text={errors.password.message} />}
      </fieldset>
      <fieldset>
        <label>Confrim password:</label>
        <input
          type="confirmPassword"
          {...methods.register('confirmPassword', {
            required: { message: 'Confirm password is required', value: true },
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage text={errors.confirmPassword.message} />
        )}
      </fieldset>
    </form>
  );
};
