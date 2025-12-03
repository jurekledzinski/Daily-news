import { ActionData } from '@/api';
import { FieldValues, UseFormReset } from 'react-hook-form';
import { removeCookie, showErrorToast, showSuccessToast } from '@helpers';
import { FetcherReset, UseAuthCallbacksProps } from './types';
import { User, useUserStore } from '@store';
import { useRef } from 'react';

export const useAuthCallbacks = ({ modal }: UseAuthCallbacksProps) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null);
  const { dispatch, state } = useUserStore();

  const successLogin = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data || !data.payload) return;
    dispatch({ type: 'SET_USER', payload: data.payload });
    showSuccessToast(data.message);
    reset();
    modal.handleClose();
  };

  const successRegister = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return;
    showSuccessToast(data.message);
    reset();
    modal.handleClose();
  };

  const failedLogin = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return;
    showErrorToast(data.message);
    reset();
  };

  const failedRegister = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return;
    showErrorToast(data.message);
    reset();
  };

  const failedLogout = (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return;
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
    state,
  };
};
