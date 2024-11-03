import { AlertError } from '../../../shared';
import { ErrorMessage } from '../../../shared/messages';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-router-dom';
import { LoginFormProps } from './types';
import { useState } from 'react';
import './Forms.css';

export const LoginForm = ({
  id,
  onSubmit,
  methods,
  serverError,
}: LoginFormProps) => {
  const { errors } = methods.formState;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form className="form" id={id} onSubmit={onSubmit} method="POST" noValidate>
      <fieldset className="form__fieldset">
        <label className="form__label">Email:</label>
        <input
          className="form__input"
          type="text"
          {...methods.register('email', {
            required: { message: 'Email is required', value: true },
            pattern: {
              message: 'Email is invalid',
              value: /\S+@\S+\.\S+/,
            },
          })}
        />

        {errors.email && <ErrorMessage> {errors.email.message}</ErrorMessage>}
      </fieldset>

      <fieldset className="form__fieldset">
        <label className="form__label">Password:</label>
        <div className="form__wrapper-input">
          <input
            className="form__input"
            type={showPassword ? 'text' : 'password'}
            {...methods.register('password', {
              required: { message: 'Password is required', value: true },
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
          <ErrorMessage> {errors.password.message}</ErrorMessage>
        )}
      </fieldset>
      {serverError && <AlertError> {serverError}</AlertError>}
    </Form>
  );
};
