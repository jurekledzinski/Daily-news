import { ActionData } from '@api';
import { defaultErrorMessage, showErrorToast, showSuccessToast } from '@helpers';
import { FetcherReset } from '@components/pages/home';
import { User } from '@models';
import { useUserStore } from '@store';

export const useProfileCallbacks = () => {
  const { dispatch, state } = useUserStore();

  const successUpdateProfile = (
    reset: FetcherReset,
    data?: ActionData<Pick<User, 'email' | 'name' | 'surname'>>
  ) => {
    if (!data) return showErrorToast(defaultErrorMessage('update profile'));
    if (data.payload) dispatch({ type: 'SET_USER', payload: data.payload });
    showSuccessToast(data.message);
    reset();
  };

  const failedUpdateProfile = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return showErrorToast(defaultErrorMessage('update profile'));
    showErrorToast(data.message);
    reset();
  };

  return {
    failedUpdateProfile,
    successUpdateProfile,
    state,
  };
};
