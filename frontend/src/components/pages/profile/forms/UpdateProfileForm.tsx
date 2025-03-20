import { AlertError, ErrorMessage } from '@/components/shared';
import { Form } from 'react-router-dom';
import { UpdateProfileFormProps } from './types';
import './Forms.css';

export const UpdateProfileForm = ({
  isDisabled,
  methods,
  onSubmit,
  serverError,
}: UpdateProfileFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <Form className="form" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        <label className="form__label">Name:</label>
        <input
          className="form__input"
          type="name"
          {...methods.register('name', {
            required: { message: 'Name is required', value: true },
          })}
          placeholder="Name"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </fieldset>

      <fieldset className="form__fieldset">
        <label className="form__label">Email:</label>
        <input
          autoComplete="username"
          className="form__input"
          type="email"
          {...methods.register('email', {
            required: { message: 'Email is required', value: true },
            pattern: {
              message: 'Email is invalid',
              value: /\S+@\S+\.\S+/,
            },
          })}
          placeholder="Email"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </fieldset>

      {serverError && <AlertError>{serverError}</AlertError>}

      <button disabled={isDisabled} type="submit">
        Update profile
      </button>
    </Form>
  );
};
