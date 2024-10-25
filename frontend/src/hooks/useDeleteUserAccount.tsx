import { useSubmit } from 'react-router-dom';

export const useDeleteUserAccount = () => {
  const submit = useSubmit();

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('actionType', 'delete-user-account');

    submit(formData, { method: 'post' });
  };

  return onSubmit;
};
