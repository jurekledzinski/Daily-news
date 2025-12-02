import { LoginFormValues, UseLoginFormProps } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetForm } from '@hooks';
import { useSubmit } from 'react-router';

export const useLogin = ({ action, onFailed, onSuccess, status }: UseLoginFormProps) => {
  const methods = useForm<LoginFormValues>({ defaultValues: { email: '', password: '' } });

  const submit = useSubmit();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const formData = new FormData();
    formData.append('actionType', 'login-user');
    formData.set('email', data.email);
    formData.set('password', data.password);
    submit(formData, { method: 'post' });
  };

  useResetForm({
    isSubmitSuccessful: methods.formState.isSubmitSuccessful,
    isSuccess: !!action?.success,
    onFailed,
    onSuccess,
    reset: methods.reset,
    state: status.state,
  });

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
