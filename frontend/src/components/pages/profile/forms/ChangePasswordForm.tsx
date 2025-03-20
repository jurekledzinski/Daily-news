import { AlertError, ErrorMessage } from '@/components/shared';
import { ChangeUserPasswordProps } from './types';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-router-dom';
import { useState } from 'react';
import './Forms.css';

export const ChangePasswordForm = ({
  methods,
  onSubmit,
  serverError,
}: ChangeUserPasswordProps) => {
  const { formState } = methods;
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPasswod, setShowConfirmPassword] = useState(false);

  return (
    <Form className="form" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        <label className="form__label">Password:</label>
        <div className="form__wrapper-input">
          <input
            autoComplete="new-password"
            className="form__input"
            type={showPassword ? 'text' : 'password'}
            {...methods.register('password', {
              required: { message: 'Password is required', value: true },
              minLength: {
                message: 'Password required at least 8 characters',
                value: 8,
              },
            })}
            placeholder="New password"
          />

          {showPassword ? (
            <button
              className="form__icon"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(false);
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          ) : (
            <button
              className="form__icon"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(true);
              }}
            >
              <FontAwesomeIcon icon={faEyeSlash} />
            </button>
          )}
        </div>

        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </fieldset>

      <fieldset className="form__fieldset">
        <label className="form__label">Confirm password:</label>
        <div className="form__wrapper-input">
          <input
            autoComplete="new-password"
            className="form__input"
            type={showConfirmPasswod ? 'text' : 'password'}
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

          {showConfirmPasswod ? (
            <button
              className="form__icon"
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmPassword(false);
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          ) : (
            <button
              className="form__icon"
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmPassword(true);
              }}
            >
              <FontAwesomeIcon icon={faEyeSlash} />
            </button>
          )}
        </div>

        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
      </fieldset>

      {serverError && <AlertError>{serverError}</AlertError>}

      <button type="submit">Change password</button>
    </Form>
  );
};
