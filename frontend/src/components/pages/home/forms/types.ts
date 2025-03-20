import { UseFormReturn } from 'react-hook-form';

export type FormResigsterValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FormLoginValues = Pick<FormResigsterValues, 'email' | 'password'>;

export type RegisterFormProps = {
  id: string;
  methods: UseFormReturn<FormResigsterValues, unknown, undefined>;
  serverError?: string;
  onSubmit: () => void;
};

export type LoginFormProps = {
  id: string;
  methods: UseFormReturn<FormLoginValues, unknown, undefined>;
  serverError?: string;
  onSubmit: () => void;
};
