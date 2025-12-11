import { ConfirmPasswordFieldProps } from './types';
import { confirmPasswordRules } from '@components/pages';
import { Field, Message, PasswordInput } from '@components/shared';
import { useFormState } from 'react-hook-form';

export const ConfirmPasswordField = ({ control, register }: ConfirmPasswordFieldProps) => {
  const { errors: confirmPasswordError } = useFormState({ control, name: 'confirmPassword' });
  return (
    <Field>
      <PasswordInput
        autoComplete="off"
        label="Confirm Password"
        {...register('confirmPassword', {
          required: 'Confirm password is required',
          validate: confirmPasswordRules,
        })}
        variant="outlined"
      />
      {confirmPasswordError.confirmPassword && <Message>{confirmPasswordError.confirmPassword?.message}</Message>}
    </Field>
  );
};
