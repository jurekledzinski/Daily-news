import { ActionData } from '@api';
import { initialTokenFailed } from '../../../utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { useResetForm } from '@hooks';
import { UserPasswordFormValues, UseUserPasswordFormProps } from './types';

export const useUserPassword = ({ onFailed, onSuccess, token }: UseUserPasswordFormProps) => {
  const methods = useForm<UserPasswordFormValues>({
    defaultValues: { confirmPassword: '', password: '' },
    mode: 'onChange',
  });

  const fetcher = useFetcher<ActionData<unknown>>();

  const onSubmit: SubmitHandler<UserPasswordFormValues> = (data) => {
    if (!token) return onFailed(fetcher.unstable_reset, initialTokenFailed);
    const formData = new FormData();
    formData.append('actionType', 'change-password');
    formData.set('password', data.password);
    formData.set('csrfToken', token);
    fetcher.submit(formData, { method: 'PATCH', preventScrollReset: true });
  };

  useResetForm({
    isSubmitSuccessful: methods.formState.isSubmitSuccessful,
    isSuccess: fetcher.data?.success,
    onFailed: () => onFailed(fetcher.unstable_reset, fetcher.data),
    onSuccess: () => onSuccess(fetcher.unstable_reset, fetcher.data),
    reset: methods.reset,
    state: fetcher.state,
  });

  return { methods, onSubmit: methods.handleSubmit(onSubmit), status: fetcher.state };
};
