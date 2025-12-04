import { ActionData } from '@api';
import { FetcherReset } from '@components/pages/home';

export type UseUserDeleteProps = {
  onFailed: (reset: FetcherReset, data?: ActionData<unknown>) => void;
  onSuccess: (reset: FetcherReset, data?: ActionData<unknown>) => void;
  token?: string;
};
