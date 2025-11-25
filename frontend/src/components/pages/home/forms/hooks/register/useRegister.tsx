import { RegisterFormValues, UseRegisterProps } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSubmit } from 'react-router';

export const useRegister = ({ onSuccess, status }: UseRegisterProps) => {
  const methods = useForm<RegisterFormValues>({
    defaultValues: { name: '', surname: '', email: '', password: '', confirmPassword: '' },
  });

  const submit = useSubmit();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    const formData = new FormData();
    formData.append('actionType', 'register-user');
    formData.set('email', data.email);
    formData.set('name', data.name);
    formData.set('surname', data.surname);
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
