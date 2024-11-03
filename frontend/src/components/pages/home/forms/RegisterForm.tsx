import { AlertError, ErrorMessage } from '../../../shared';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RegisterFormProps } from './types';
import { useState } from 'react';
import './Forms.css';

export const RegisterForm = ({
  id,
  onSubmit,
  methods,
  serverError,
}: RegisterFormProps) => {
  const { errors } = methods.formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPasswod, setShowConfirmPassword] = useState(false);

  return (
    <form className="form" id={id} onSubmit={onSubmit} noValidate>
      <fieldset className="form__fieldset">
        <label className="form__label">Name:</label>
        <input
          className="form__input"
          type="text"
          {...methods.register('name', {
            required: { message: 'Name is required', value: true },
            minLength: {
              message: 'Name minimum length characters is 2',
              value: 2,
            },
          })}
        />

        {errors.name && <ErrorMessage>{errors.name.message} </ErrorMessage>}
      </fieldset>

      <fieldset className="form__fieldset">
        <label className="form__label">Email:</label>
        <input
          className="form__input"
          type="email"
          {...methods.register('email', {
            required: { message: 'Email is required', value: true },
            pattern: {
              message: 'Email is invalid',
              value: /\S+@\S+\.\S+/,
            },
          })}
        />

        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </fieldset>

      <fieldset className="form__fieldset">
        <label className="form__label">Password:</label>
        <div className="form__wrapper-input">
          <input
            className="form__input"
            type={showPassword ? 'text' : 'password'}
            {...methods.register('password', {
              required: { message: 'Password is required', value: true },
              minLength: {
                message: 'Password required at least 8 characters',
                value: 8,
              },
            })}
          />

          {showPassword ? (
            <button
              className={
                showPassword ? 'form__icon form__icon--visible' : 'form__icon'
              }
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
        <label className="form__label">Confrim password:</label>
        <div className="form__wrapper-input">
          <input
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
          />

          {showConfirmPasswod ? (
            <button
              className={
                showConfirmPasswod
                  ? 'form__icon form__icon--visible'
                  : 'form__icon'
              }
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

      {serverError && <AlertError> {serverError}</AlertError>}
    </form>
  );
};
