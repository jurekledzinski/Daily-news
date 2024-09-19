import { useForm } from 'react-hook-form';
import { FormLoginValues, useLoginFormProps } from '../components/pages';
// import { useMutation } from '@tanstack/react-query';

export const useLoginForm = ({ onSuccess }: useLoginFormProps) => {
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
      onSuccess();
    },
  };
};
