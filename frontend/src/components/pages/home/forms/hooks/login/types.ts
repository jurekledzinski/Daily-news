import { ActionData } from '@api';
import { FetcherReset } from '@components/pages';
import { RegisterFormValues } from '../register';
import { User } from '@models';

export type LoginFormValues = Pick<RegisterFormValues, 'email' | 'password'>;

export type UseLoginFormProps = {
  onFailed: (reset: FetcherReset, data?: ActionData<User>) => void;
  onSuccess: (reset: FetcherReset, data?: ActionData<User>) => void;
};
