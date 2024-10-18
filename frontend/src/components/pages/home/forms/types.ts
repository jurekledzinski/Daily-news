import { SubmitHandler } from 'react-hook-form';

export type FormResigsterValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FormLoginValues = Pick<FormResigsterValues, 'email' | 'password'>;

export type RegisterFormProps = {
  onSubmit: SubmitHandler<FormResigsterValues>;
};

export type LoginFormProps = {
  onSubmit: SubmitHandler<FormLoginValues>;
};

export type useLoginFormProps = {
  onSuccess: () => void;
};

export type useRegisterFormProps = {
  onSuccess: () => void;
};
