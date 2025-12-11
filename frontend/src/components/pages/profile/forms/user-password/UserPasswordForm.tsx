import { confirmPasswordRules, passwordRules } from '../utils';
import { UserPasswordFormProps } from './types';
import {
  Button,
  ButtonGroup,
  Field,
  Form,
  Message,
  PasswordInput,
  PasswordValidationStatus,
} from '@components/shared';

export const UserPasswordForm = ({ controls, isPending, onSubmit }: UserPasswordFormProps) => {
  const { control, register, formState, getValues, trigger } = controls;
  const { errors } = formState;

  return (
    <Form autoComplete="off" className="g-sm" onSubmit={onSubmit} noValidate>
      <Field>
        <PasswordInput
          autoComplete="off"
          label="Password"
          {...register('password', { required: 'Password is required', validate: passwordRules })}
          variant="outlined"
        />
        {errors.password && <Message>{errors.password.message}</Message>}
      </Field>
      <Field>
        <PasswordInput
          autoComplete="off"
          label="Confirm password"
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: confirmPasswordRules,
          })}
          variant="outlined"
        />
        {errors.confirmPassword && <Message>{errors.confirmPassword.message}</Message>}
      </Field>

      <PasswordValidationStatus
        control={control}
        getValues={getValues}
        nameConfirmPassword="confirmPassword"
        namePassword="password"
        passwordRules={passwordRules}
        trigger={trigger}
      />

      <ButtonGroup justify="justify-end" fullWidth>
        <Button
          className="r-xs"
          color="info"
          label="Change password"
          isLoading={isPending}
          size="size-xs"
          type="submit"
        />
      </ButtonGroup>
    </Form>
  );
};
