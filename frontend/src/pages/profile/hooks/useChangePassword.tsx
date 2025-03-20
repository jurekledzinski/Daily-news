import { InputsPassword } from '@/components/pages';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';

type UseChangePasswordProps = {
  token: string;
};

export const useChangePassword = ({ token }: UseChangePasswordProps) => {
  const methods = useForm<InputsPassword>();
  const submit = useSubmit();

  const onSubmit = (data: InputsPassword) => {
    const formData = new FormData();
    formData.append('actionType', 'change-password');
    formData.set('password', data.password);
    formData.append('csrfToken', token);

    submit(formData, { method: 'post' });
    methods.reset();
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
