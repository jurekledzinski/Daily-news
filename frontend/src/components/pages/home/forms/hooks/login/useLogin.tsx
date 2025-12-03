import { ActionData } from '@api';
import { LoginFormValues, UseLoginFormProps } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { User } from '@models';
import { useResetForm } from '@hooks';

export const useLogin = ({ onFailed, onSuccess }: UseLoginFormProps) => {
  const methods = useForm<LoginFormValues>({ defaultValues: { email: '', password: '' } });

  const fetcher = useFetcher<ActionData<User>>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const formData = new FormData();
    formData.append('actionType', 'login-user');
    formData.set('email', data.email);
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
