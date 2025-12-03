import { ActionData } from '@api';
import { FetcherReset } from '@components/pages/home';

export type UserProfileFormValues = {
  email: string;
  name: string;
  surname: string;
};

export type UseUserProfileFormProps = {
  onFailed: (reset: FetcherReset, data?: ActionData<unknown>) => void;
  onSuccess: (reset: FetcherReset, data?: ActionData<unknown>) => void;
};
