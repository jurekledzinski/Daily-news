import { useEffect } from 'react';
import { UseLogoutProps } from './types';
import { useSubmit } from 'react-router';

export const useLogout = ({ action, onFailed, onSuccess }: UseLogoutProps) => {
  const submit = useSubmit();

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('actionType', 'logout-user');

    submit(formData, { method: 'post' });
    onSuccess();
  };

  useEffect(() => {
    if (action && !action.success && action.action === 'logout-user') onFailed();
  }, [action, onFailed]);

  return onSubmit;
};
