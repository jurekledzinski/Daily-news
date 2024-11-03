import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';
import {
  FormResigsterValues,
  useRegisterFormProps,
} from '../components/pages/';

export const useRegisterForm = ({
  error,
  onSuccess,
  status,
}: useRegisterFormProps) => {
  const methods = useForm<FormResigsterValues>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const submit = useSubmit();

  const onSubmit = (data: FormResigsterValues) => {
    const formData = new FormData();
    formData.append('actionType', 'register-user');
    formData.set('email', data.email);
    formData.set('name', data.name);
    formData.set('password', data.password);

    submit(formData, { method: 'post' });
  };

  useEffect(() => {
    if (status === 'idle' && !error && methods.formState.isSubmitSuccessful) {
      onSuccess(methods.reset);
    }
  }, [error, methods, onSuccess, status]);

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
