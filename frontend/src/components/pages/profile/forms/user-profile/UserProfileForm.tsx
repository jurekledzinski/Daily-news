import { Button, ButtonGroup, Field, Form, Message, PasswordInput, TextInput } from '@components/shared';
import { UserProfileFormProps } from './types';

export const UserProfileForm = ({ controls, isPending, onSubmit }: UserProfileFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form className="g-sm" onSubmit={onSubmit} noValidate>
      <Field>
        <TextInput
          autoComplete="username"
          label="Name"
          {...register('name', { required: 'Name is required' })}
          variant="outlined"
        />
        {errors.name && <Message>{errors.name.message}</Message>}
      </Field>
      <Field>
        <TextInput
          autoComplete="username"
          label="Surname"
          {...register('surname', { required: 'Surname is required' })}
          variant="outlined"
        />
        {errors.surname && <Message>{errors.surname.message}</Message>}
      </Field>
      <Field>
        <PasswordInput
          autoComplete="email"
          label="Email"
          {...register('email', { required: 'Email is required' })}
          variant="outlined"
        />
        {errors.email && <Message>{errors.email.message}</Message>}
      </Field>
      <ButtonGroup justify="justify-end" fullWidth>
        <Button label="Update profile" isLoading={isPending} type="submit" />
      </ButtonGroup>
    </Form>
  );
};
