import { ActionData } from '@api';

export type UseLogoutProps = {
  onFailed: () => void;
  onSuccess: () => void;
  action?: ActionData;
};
