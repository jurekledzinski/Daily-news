import { ConfirmPasswordField, PasswordValidation } from '@components/pages';
import { emailRules, passwordRules } from '../utils';
import { Field, Form, Message, PasswordInput, TextInput } from '@components/shared';
import { RegisterFormProps } from './types';
import { useFormState } from 'react-hook-form';

export const RegisterForm = ({ controls, onSubmit }: RegisterFormProps) => {
  const { control, getValues, register, trigger } = controls;

  const { errors: nameError } = useFormState({ control, name: 'name' });
  const { errors: surnameError } = useFormState({ control, name: 'surname' });
  const { errors: emailError } = useFormState({ control, name: 'email' });
  const { errors: passwordError } = useFormState({ control, name: 'password' });

  return (
    <Form autoComplete="off" className="g-sm" id="registerForm" onSubmit={onSubmit} noValidate>
      <Field>
        <TextInput
          autoComplete="given-name"
          label="Name"
          {...register('name', { required: 'Name is required' })}
          variant="outlined"
        />
        {nameError.name && <Message>{nameError.name?.message}</Message>}
      </Field>
      <Field>
        <TextInput
          autoComplete="family-name"
          label="Surname"
          {...register('surname', { required: 'Surname is required' })}
          variant="outlined"
        />
        {surnameError.surname && <Message>{surnameError.surname?.message}</Message>}
      </Field>
      <Field>
        <TextInput
          autoComplete="username"
          label="Email"
          {...register('email', { required: 'Email is required', validate: emailRules })}
          variant="outlined"
        />
        {emailError.email && <Message>{emailError.email?.message}</Message>}
      </Field>
      <Field>
        <PasswordInput
          autoComplete="new-password"
          label="Password"
          {...register('password', {
            required: 'Password is required',
            validate: passwordRules,
          })}
          variant="outlined"
        />
        {passwordError.password && <Message>{passwordError.password?.message}</Message>}
      </Field>
      <ConfirmPasswordField control={control} register={register} />
      <PasswordValidation control={control} getValues={getValues} trigger={trigger} />
    </Form>
  );
};
