import { useEffect } from 'react';
import { UseLogoutUserProps } from './types';
import { useSubmit } from 'react-router';

export const useLogoutUser = ({ action, onFailed, onSuccess }: UseLogoutUserProps) => {
  const submit = useSubmit();

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('actionType', 'logout-user');

    submit(formData, { method: 'post' });
    onSuccess();
  };

  useEffect(() => {
    if (action && !action.success) onFailed();
  }, [action, onFailed]);

  return onSubmit;
};
