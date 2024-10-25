import { AlertError, ErrorMessage } from '../../../shared';
import { ChangeUserPasswordProps } from './types';
import { Form } from 'react-router-dom';
import './Forms.css';

export const ChangePasswordForm = ({
  methods,
  onSubmit,
  serverError,
}: ChangeUserPasswordProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <div className="profile__password-form">
      <Form onSubmit={onSubmit}>
        <fieldset>
          <label>Password:</label>
          <input
            type="password"
            {...methods.register('password', {
              required: { message: 'Password is required', value: true },
              minLength: {
                message: 'Password required at least 8 characters',
                value: 8,
              },
            })}
            placeholder="New password"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </fieldset>

        <fieldset>
          <label>Confirm password:</label>
          <input
            type="password"
            {...methods.register('confirmPassword', {
              required: {
                message: 'Confirm password is required',
                value: true,
              },
              minLength: {
                message: 'Confirm password required at least 8 characters',
                value: 8,
              },
              validate: (value, formValues) => {
                return (
                  formValues.password === value || "Passwords aren't the same"
                );
              },
            })}
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </fieldset>

        {serverError && <AlertError>{serverError}</AlertError>}

        <button type="submit">Change password</button>
      </Form>
    </div>
  );
};
