import { ActionData } from '@/api';
import { defaultErrorMessage, removeCookie, showErrorToast, showSuccessToast } from '@helpers';
import { FetcherReset, UseAuthCallbacksProps } from './types';
import { FieldValues, UseFormReset } from 'react-hook-form';
import { useRef } from 'react';
import { User, useUserStore } from '@store';

export const useAuthCallbacks = ({ modal }: UseAuthCallbacksProps) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null);
  const { setUser, user } = useUserStore();

  const successLogin = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return showErrorToast(defaultErrorMessage('login'));
    if (data.payload) setUser(data.payload);
    showSuccessToast(data.message);
    reset();
    modal.handleClose();
  };

  const successRegister = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return showErrorToast(defaultErrorMessage('register'));
    showSuccessToast(data.message);
    reset();
    modal.handleClose();
  };

  const failedLogin = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return showErrorToast(defaultErrorMessage('login'));
    showErrorToast(data.message);
    reset();
  };

  const failedRegister = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return showErrorToast(defaultErrorMessage('register'));
    showErrorToast(data.message);
    reset();
  };

  const failedLogout = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return showErrorToast(defaultErrorMessage('logout'));
    removeCookie('enable');
    showErrorToast(data.message);
    reset();
  };

  const closeModal = <T extends FieldValues>(resetCallback: UseFormReset<T>) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      resetCallback();
      if (!timeoutId.current) return;
      timeoutId.current = null;
    }, 500);

    modal.handleClose();
  };

  return {
    closeModal,
    failedLogin,
    failedRegister,
    failedLogout,
    successLogin,
    successRegister,
    state: { user },
  };
};
