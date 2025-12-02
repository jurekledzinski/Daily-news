import { ActionData } from '@api';
import { Navigation } from 'react-router';

export type RegisterFormValues = {
  email: string;
  name: string;
  password: string;
  surname: string;
  confirmPassword?: string;
};

export type UseRegisterProps = {
  onFailed: () => void;
  onSuccess: () => void;
  status: Navigation;
  action?: ActionData;
};
