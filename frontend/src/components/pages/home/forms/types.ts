import { UseFormReset, UseFormReturn } from 'react-hook-form';

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

export type useLoginFormProps = {
  error: { message: string; action: string } | null;
  onSuccess: (reset: UseFormReset<FormLoginValues>) => void;
  status: 'idle' | 'loading' | 'submitting';
};

export type useLogoutUserProps = {
  onSuccess: () => void;
};

export type useRegisterFormProps = {
  error: { message: string; action: string } | null;
  onSuccess: (reset: UseFormReset<FormResigsterValues>) => void;
  status: 'idle' | 'loading' | 'submitting';
};
