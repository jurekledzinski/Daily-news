import { showErrorToast, showSuccessToast } from '@helpers';
import { UseCommentCallbacksProps } from './types';
import { useNavigate } from 'react-router';

export const useCommentCallbacks = ({ action }: UseCommentCallbacksProps) => {
  const navigate = useNavigate();

  const navigateUrl = () => {
    navigate(window.location.pathname, { replace: true, preventScrollReset: true });
  };

  const successAddComment = () => {
    if (!action) return;
    showSuccessToast(action.message);
  };

  const failedAddComment = () => {
    if (!action) return;
    navigateUrl();
    showErrorToast(action.message);
  };

  return { failedAddComment, successAddComment };
};
