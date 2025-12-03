import { ActionData } from '@api';
import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import { UseUserDeleteProps } from './types';

export const useUserDelete = ({ onFailed, onSuccess }: UseUserDeleteProps) => {
  const fetcher = useFetcher<ActionData<unknown>>();

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('actionType', 'delete-user-account');
    fetcher.submit(formData, { method: 'post' });
  };

  useEffect(() => {
    if (fetcher.data && !fetcher.data.success && fetcher.data.action === 'delete-user-account') {
      onFailed(fetcher.unstable_reset, fetcher.data);
    }

    if (fetcher.data && fetcher.data.success && fetcher.data.action === 'delete-user-account') {
      onSuccess(fetcher.unstable_reset, fetcher.data);
    }
  }, [fetcher, onFailed, onSuccess]);

  return onSubmit;
};
