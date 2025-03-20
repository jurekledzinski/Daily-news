import { UseLogoutUserProps } from './types';
import { useSubmit } from 'react-router-dom';

export const useLogoutUser = ({ onSuccess }: UseLogoutUserProps) => {
  const submit = useSubmit();

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('actionType', 'logout-user');

    submit(formData, { method: 'post' });
    onSuccess();
  };

  return onSubmit;
};
