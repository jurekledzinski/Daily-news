import { Field, Form, Message, PasswordInput, TextInput } from '@components/shared';
import { RegisterFormProps } from './types';

export const RegisterForm = ({ controls, onSubmit }: RegisterFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form className="g-sm" id="registerForm" onSubmit={onSubmit} noValidate>
      <Field>
        <TextInput
          autoComplete="given-name"
          label="Name"
          {...register('name', { required: 'Name is required' })}
          variant="outlined"
        />
        {errors.name && <Message>{errors.name.message}</Message>}
      </Field>
      <Field>
        <TextInput
          autoComplete="family-name"
          label="Surname"
          {...register('surname', { required: 'Surname is required' })}
          variant="outlined"
        />
        {errors.surname && <Message>{errors.surname.message}</Message>}
      </Field>
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
          autoComplete="new-password"
          label="Password"
          {...register('password', {
            required: 'Password is required',
          })}
          variant="outlined"
        />
        {errors.password && <Message>{errors.password.message}</Message>}
      </Field>
      <Field>
        <PasswordInput
          autoComplete="new-password"
          label="Confirm Password"
          {...register('confirmPassword', { required: 'Confirm password is required' })}
          variant="outlined"
        />
        {errors.password && <Message>{errors.password.message}</Message>}
      </Field>
    </Form>
  );
};
