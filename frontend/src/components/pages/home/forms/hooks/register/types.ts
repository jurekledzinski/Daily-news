export type RegisterFormValues = {
  email: string;
  name: string;
  password: string;
  surname: string;
  confirmPassword?: string;
};

export type UseRegisterProps = {
  onSuccess: () => void;
  status: 'idle' | 'loading' | 'submitting';
};
