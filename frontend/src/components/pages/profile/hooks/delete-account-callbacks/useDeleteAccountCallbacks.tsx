import { ActionData } from '@api';
import { defaultErrorMessage, removeCookie, showErrorToast, showSuccessToast } from '@helpers';
import { FetcherReset } from '@components/pages/home';
import { useNavigate } from 'react-router';
import { useUserStore } from '@store';

export const useDeleteAccountCallbacks = () => {
  const navigate = useNavigate();
  const { dispatch } = useUserStore();

  const failedDelete = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return showErrorToast(defaultErrorMessage('delete account'));
    showErrorToast(data.message);
    reset();
  };

  const successDelete = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return showErrorToast(defaultErrorMessage('delete account'));
    removeCookie('enable');
    dispatch({ type: 'LOGOUT_USER' });
    showSuccessToast(data.message);
    reset();
    navigate('/', { replace: true, viewTransition: true });
  };

  return {
    failedDelete,
    successDelete,
  };
};
