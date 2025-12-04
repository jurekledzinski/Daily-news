import { ActionData } from '@api';
import { initialTokenFailed } from '@components/pages';
import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import { UseUserDeleteProps } from './types';

export const useUserDelete = ({ onFailed, onSuccess, token }: UseUserDeleteProps) => {
  const fetcher = useFetcher<ActionData<unknown>>();

  const onSubmit = () => {
    if (!token) return onFailed(fetcher.unstable_reset, initialTokenFailed);
    const formData = new FormData();
    formData.append('actionType', 'delete-user-account');
    formData.set('csrfToken', token);
    fetcher.submit(formData, { method: 'DELETE' });
  };

  useEffect(() => {
    if (fetcher.data && !fetcher.data.success && fetcher.data.action === 'delete-user-account') {
      onFailed(fetcher.unstable_reset, fetcher.data);
    }

    if (fetcher.data && fetcher.data.success && fetcher.data.action === 'delete-user-account') {
      onSuccess(fetcher.unstable_reset, fetcher.data);
    }
  }, [fetcher, onFailed, onSuccess]);

  return { onSubmit, status: fetcher.state };
};
