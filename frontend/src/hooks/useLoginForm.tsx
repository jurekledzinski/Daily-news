import { APICreateResponseSuccess, URLS } from '../api';
import { FormLoginValues, useLoginFormProps } from '../components/pages';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLoginForm = ({ onSuccess }: useLoginFormProps) => {
  const queryClient = useQueryClient();

  const formMethods = useForm<FormLoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = useMutation<APICreateResponseSuccess, Error, FormLoginValues>({
    mutationFn: async (data) => {
      const response = await fetch(URLS.LOGIN_USER(), {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
      });
      return await response.json();
    },
    onSuccess: () => {
      onSuccess();
      formMethods.reset();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    formMethods,
    onSubmit: (data: FormLoginValues) => submit.mutate(data),
  };
};
