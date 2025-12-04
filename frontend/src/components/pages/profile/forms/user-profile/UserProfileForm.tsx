import styles from './UserProfileForm.module.css';
import { Button, ButtonGroup, Field, Form, FormGroup, Message, TextInput } from '@components/shared';
import { UserProfileFormProps } from './types';

export const UserProfileForm = ({ controls, isPending, onSubmit }: UserProfileFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form className="g-sm" onSubmit={onSubmit} noValidate>
      <FormGroup className={styles.formGroup}>
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
      </FormGroup>

      <Field>
        <TextInput
          autoComplete="email"
          label="Email"
          {...register('email', { required: 'Email is required' })}
          variant="outlined"
        />
        {errors.email && <Message>{errors.email.message}</Message>}
      </Field>
      <ButtonGroup className="mt-sm" justify="justify-end" fullWidth>
        <Button color="info" label="Update profile" isLoading={isPending} type="submit" />
      </ButtonGroup>
    </Form>
  );
};
