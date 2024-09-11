import { useForm } from 'react-hook-form';
import { FormLoginValues } from '../types';
// import { useMutation } from '@tanstack/react-query';

export const useLoginForm = () => {
  const formMethods = useForm<FormLoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return {
    formMethods,
    onSubmit: (data: FormLoginValues) => {
      console.log('DATA ------------ login', data);
    },
  };
};
