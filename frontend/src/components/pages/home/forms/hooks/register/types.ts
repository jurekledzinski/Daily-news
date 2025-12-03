import { ActionData } from '@api';
import { FetcherReset } from '@components/pages';
import { User } from '@models';

export type RegisterFormValues = {
  email: string;
  name: string;
  password: string;
  surname: string;
  confirmPassword?: string;
};

export type UseRegisterProps = {
  onFailed: (reset: FetcherReset, data?: ActionData<User>) => void;
  onSuccess: (reset: FetcherReset, data?: ActionData<User>) => void;
};
