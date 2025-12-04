import { ActionData } from '@api';
import { FetcherReset } from '@components/pages/home';

export type UserPasswordFormValues = {
  password: string;
  confirmPassword?: string;
};

export type UseUserPasswordFormProps = {
  onFailed: (reset: FetcherReset, data?: ActionData<unknown>) => void;
  onSuccess: (reset: FetcherReset, data?: ActionData<unknown>) => void;
  token?: string;
};
