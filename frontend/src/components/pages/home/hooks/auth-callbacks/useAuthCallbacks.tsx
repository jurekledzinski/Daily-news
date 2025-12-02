import { showErrorToast, showSuccessToast } from '@helpers';
import { UseAuthCallbacksProps } from './types';
import { useUserStore } from '@store';
import { useNavigate } from 'react-router';

export const useAuthCallbacks = ({ action, modal }: UseAuthCallbacksProps) => {
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
    console.log('failed logout');
    if (!action) return;
    navigateUrl();
    showErrorToast(action.message);
  };

  return {
    failedLogin,
    failedRegister,
    failedLogout,
    successLogin,
    successRegister,
    state,
  };
};
