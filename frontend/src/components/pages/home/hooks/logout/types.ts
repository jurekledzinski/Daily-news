import { ActionData } from '@api';
import { FetcherReset } from '../auth-callbacks';
import { User } from '@models';

export type UseLogoutProps = {
  onFailed: (reset: FetcherReset, data?: ActionData<User>) => void;
  onSuccess: (reset: FetcherReset, data?: ActionData<User>) => void;
};
