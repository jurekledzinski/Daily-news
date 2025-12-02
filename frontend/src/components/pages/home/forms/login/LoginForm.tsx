import { Field, Form, Message, PasswordInput, TextInput } from '@components/shared';
import { LoginFormProps } from './types';

export const LoginForm = ({ controls, onSubmit }: LoginFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form className="g-sm" id="loginForm" onSubmit={onSubmit} noValidate>
      <Field>
        <TextInput
          autoComplete="username"
          label="Email"
          {...register('email', { required: 'Email is required' })}
          variant="outlined"
        />
        {errors.email && <Message>{errors.email.message}</Message>}
      </Field>
      <Field>
        <PasswordInput
          autoComplete="current-password"
          label="Password"
          {...register('password', { required: 'Password is required' })}
          variant="outlined"
        />
        {errors.password && <Message>{errors.password.message}</Message>}
      </Field>
    </Form>
  );
};
