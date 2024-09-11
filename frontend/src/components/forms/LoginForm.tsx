import { useFormContext } from 'react-hook-form';
import { FormLoginValues, LoginFormProps } from '../../types';
import { ErrorMessage } from '../Messages';

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const methods = useFormContext<FormLoginValues>();
  const { errors } = methods.formState;
  console.log('errors login', errors);

  return (
    <form id="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
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
    </form>
  );
};
