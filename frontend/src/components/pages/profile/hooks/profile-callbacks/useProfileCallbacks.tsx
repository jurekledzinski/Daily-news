import { ActionData } from '@api';
import { FetcherReset } from '@components/pages/home';
import { removeCookie, showErrorToast, showSuccessToast } from '@helpers';
import { User } from '@models';
import { useUserStore } from '@store';

export const useProfileCallbacks = () => {
  const { dispatch, state } = useUserStore();

  const successUpdateProfile = (
    reset: FetcherReset,
    data?: ActionData<Pick<User, 'email' | 'name' | 'surname'>>
  ) => {
    if (!data || !data.payload) return;
    dispatch({ type: 'SET_USER', payload: data.payload });
    showSuccessToast(data.message);
    reset();
  };

  const successUpdatePassword = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return;
    showSuccessToast(data.message);
    reset();
  };

  const failedUpdateProfile = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return;
    showErrorToast(data.message);
    reset();
  };

  const failedUpdatePassword = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return;
    showErrorToast(data.message);
    reset();
  };

  const failedDeleteAccount = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return;
    removeCookie('enable');
    showErrorToast(data.message);
    reset();
  };

  return {
    failedUpdateProfile,
    failedUpdatePassword,
    failedDeleteAccount,
    successUpdateProfile,
    successUpdatePassword,
    state,
  };
};

// Praktycznie to co w useAuthCallbacks
// Możliwe że po update trzeba będzie jednak wysłać coś z powrotem gdy update user
// name surname email by zaktualizować store user wtedy gdy update user

// A gdy delete user accoutn to dispatch user logout będzie tam
// Gdy delete user account to na backend dodaj usuwanie wszystkich komentarzy usera także
