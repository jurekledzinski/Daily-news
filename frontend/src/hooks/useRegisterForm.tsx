import { APICreateResponseSuccess, URLS } from '../api';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  FormResigsterValues,
  useRegisterFormProps,
} from '../components/pages/';

export const useRegisterForm = ({ onSuccess }: useRegisterFormProps) => {
  const formMethods = useForm<FormResigsterValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const submit = useMutation<
    APICreateResponseSuccess,
    Error,
    Omit<FormResigsterValues, 'confirmPassword'>
  >({
    mutationFn: async (data) => {
      const response = await fetch(URLS.CREATE_USER(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(data),
      });
      return await response.json();
    },
    onSuccess: () => {
      onSuccess();
      formMethods.reset();
    },
  });

  return {
    formMethods,
    onSubmit: (data: FormResigsterValues) => {
      delete data.confirmPassword;
      submit.mutate(data);
    },
  };
};
