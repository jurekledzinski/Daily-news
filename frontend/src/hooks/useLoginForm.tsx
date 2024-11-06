import { FormLoginValues, useLoginFormProps } from '@components/pages';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';

export const useLoginForm = ({
  error,
  onSuccess,
  status,
}: useLoginFormProps) => {
  const methods = useForm<FormLoginValues>({
    defaultValues: { email: '', password: '' },
  });

  const submit = useSubmit();

  const onSubmit = (data: FormLoginValues) => {
    const formData = new FormData();
    formData.append('actionType', 'login-user');
    formData.set('email', data.email);
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
