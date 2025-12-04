import { ActionData } from '@api';
import { FetcherReset } from '@components/pages/home';
import { User } from '@models';

export type UserProfileFormValues = {
  email: string;
  name: string;
  surname: string;
};

export type UseUserProfileFormProps = {
  onFailed: (reset: FetcherReset, data?: ActionData<unknown>) => void;
  onSuccess: (reset: FetcherReset, data?: ActionData<Pick<User, 'email' | 'name' | 'surname'>>) => void;
  user: Pick<User, 'email' | 'name' | 'surname'> | null;
  token?: string;
};
