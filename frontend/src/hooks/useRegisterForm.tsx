import { useForm } from 'react-hook-form';
import { FormResigsterValues } from '../types';
// import { useMutation } from '@tanstack/react-query';

export const useRegisterForm = () => {
  const formMethods = useForm<FormResigsterValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return {
    formMethods,
    onSubmit: (data: FormResigsterValues) => {
      console.log('DATA ------------', data);
    },
  };
};
