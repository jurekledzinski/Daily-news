import { ActionData } from '@api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { useResetForm } from '@hooks';
import { UserPasswordFormValues, UseUserPasswordFormProps } from './types';

export const useUserPassword = ({ onFailed, onSuccess }: UseUserPasswordFormProps) => {
  const methods = useForm<UserPasswordFormValues>({ defaultValues: { confirmPassword: '', password: '' } });

  const fetcher = useFetcher<ActionData<unknown>>();

  const onSubmit: SubmitHandler<UserPasswordFormValues> = (data) => {
    const formData = new FormData();
    formData.append('actionType', 'change-password');
    formData.set('password', data.password);
    fetcher.submit(formData, { method: 'post', action: '/', preventScrollReset: true });
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
