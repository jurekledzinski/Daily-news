import { AlertError, ErrorMessage } from '../../../shared';
import { Form } from 'react-router-dom';
import { UpdateProfileFormProps } from './types';
import './Forms.css';

export const UpdateProfileForm = ({
  methods,
  onSubmit,
  serverError,
}: UpdateProfileFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <div className="profile__form">
      <Form onSubmit={onSubmit}>
        <fieldset>
          <label>Name:</label>
          <input
            type="name"
            {...methods.register('name', {
              required: { message: 'Name is required', value: true },
            })}
            placeholder="Name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </fieldset>

        <fieldset>
          <label>Email:</label>
          <input
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

        <button type="submit">Update profile</button>
      </Form>
    </div>
  );
};
