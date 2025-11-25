import { LoginFormValues, UseLoginFormProps } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSubmit } from 'react-router';

export const useLogin = ({ onSuccess, status }: UseLoginFormProps) => {
  const methods = useForm<LoginFormValues>({ defaultValues: { email: '', password: '' } });

  const submit = useSubmit();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const formData = new FormData();
    formData.append('actionType', 'login-user');
    formData.set('email', data.email);
    formData.set('password', data.password);
    submit(formData, { method: 'post' });
  };

  useEffect(() => {
    if (status === 'idle' && methods.formState.isSubmitSuccessful) {
      onSuccess();
      methods.reset();
    }
  }, [methods, onSuccess, status]);

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
