import { ActionData } from '@api';

export type UseFetchUserDataProps = {
  isLoggedIn: boolean;
};

export type UseLogoutUserProps = {
  onFailed: () => void;
  onSuccess: () => void;
  action?: ActionData;
};
