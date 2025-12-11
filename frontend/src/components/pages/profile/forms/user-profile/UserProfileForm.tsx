import styles from './UserProfileForm.module.css';
import { Button, ButtonGroup, Field, Form, FormGroup, Message, TextInput } from '@components/shared';
import { emailRules } from '../utils';
import { UserProfileFormProps } from './types';

export const UserProfileForm = ({ controls, isPending, onSubmit }: UserProfileFormProps) => {
  const { register, formState } = controls;
  const { errors } = formState;

  return (
    <Form autoComplete="off" className="g-sm" onSubmit={onSubmit} noValidate>
      <FormGroup className={styles.formGroup}>
        <Field>
          <TextInput
            autoComplete="off"
            label="Name"
            {...register('name', { required: 'Name is required' })}
            variant="outlined"
          />
          {errors.name && <Message>{errors.name.message}</Message>}
        </Field>
        <Field>
          <TextInput
            autoComplete="off"
            label="Surname"
            {...register('surname', { required: 'Surname is required' })}
            variant="outlined"
          />
          {errors.surname && <Message>{errors.surname.message}</Message>}
        </Field>
      </FormGroup>
      <Field>
        <TextInput
          autoComplete="off"
          label="Email"
          {...register('email', { required: 'Email is required', validate: emailRules })}
          variant="outlined"
        />
        {errors.email && <Message>{errors.email.message}</Message>}
      </Field>
      <ButtonGroup className="mt-sm" justify="justify-end" fullWidth>
        <Button
          className="r-xs"
          color="info"
          label="Update profile"
          isLoading={isPending}
          size="size-xs"
          type="submit"
        />
      </ButtonGroup>
    </Form>
  );
};
