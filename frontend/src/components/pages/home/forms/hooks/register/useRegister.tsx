import { RegisterFormValues, UseRegisterProps } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetForm } from '@/hooks';
import { useSubmit } from 'react-router';

export const useRegister = ({ action, onFailed, onSuccess, status }: UseRegisterProps) => {
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
    console.log('res', data);
    submit(formData, { method: 'post', viewTransition: true });
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
