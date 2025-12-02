import { FieldValues, UseFormReset } from 'react-hook-form';
import { removeCookie, showErrorToast, showSuccessToast } from '@helpers';
import { UseAuthCallbacksProps } from './types';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { useUserStore } from '@store';

export const useAuthCallbacks = ({ action, modal }: UseAuthCallbacksProps) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null);
  const navigate = useNavigate();
  const { dispatch, state } = useUserStore();

  const navigateUrl = () => {
    navigate(window.location.pathname, { replace: true });
  };

  const successLogin = () => {
    if (!action || !action.payload) return;
    dispatch({ type: 'SET_USER', payload: action?.payload });
    showSuccessToast(action.message);
    modal.handleClose();
  };

  const successRegister = () => {
    if (!action) return;
    showSuccessToast(action.message);
    modal.handleClose();
  };

  const failedLogin = () => {
    if (!action) return;
    navigateUrl();
    showErrorToast(action.message);
  };

  const failedRegister = () => {
    if (!action) return;
    navigateUrl();
    showErrorToast(action.message);
  };

  const failedLogout = () => {
    if (!action) return;
    removeCookie('enable');
    navigateUrl();
    showErrorToast(action.message);
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

  return { closeModal, failedLogin, failedRegister, failedLogout, successLogin, successRegister, state };
};
