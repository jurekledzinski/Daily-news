import { ActionData } from '@api';
import { defaultErrorMessage, showErrorToast, showSuccessToast } from '@helpers';
import { FetcherReset } from '@components/pages/home';

export const usePasswordCallbacks = () => {
  const successUpdatePassword = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return showErrorToast(defaultErrorMessage('change password'));
    showSuccessToast(data.message);
    reset();
  };

  const failedUpdatePassword = (reset: FetcherReset, data?: ActionData<unknown>) => {
    if (!data) return showErrorToast(defaultErrorMessage('change password'));
    showErrorToast(data.message);
    reset();
  };

  return {
    failedUpdatePassword,
    successUpdatePassword,
  };
};
