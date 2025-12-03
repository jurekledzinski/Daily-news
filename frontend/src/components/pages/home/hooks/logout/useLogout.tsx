import { ActionData } from '@api';
import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import { UseLogoutProps } from './types';
import { User } from '@models';

export const useLogout = ({ onFailed, onSuccess }: UseLogoutProps) => {
  const fetcher = useFetcher<ActionData<User>>();

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('actionType', 'logout-user');
    fetcher.submit(formData, { method: 'post' });
    onSuccess(fetcher.unstable_reset, fetcher.data);
  };

  useEffect(() => {
    if (fetcher.data && !fetcher.data.success && fetcher.data.action === 'logout-user') {
      onFailed(fetcher.unstable_reset, fetcher.data);
    }
  }, [fetcher, onFailed]);

  return onSubmit;
};
