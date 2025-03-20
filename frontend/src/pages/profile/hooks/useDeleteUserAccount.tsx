import { useSubmit } from 'react-router-dom';

type useDeleteUserAccountProps = {
  token: string;
};

export const useDeleteUserAccount = ({ token }: useDeleteUserAccountProps) => {
  const submit = useSubmit();

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('actionType', 'delete-user-account');
    formData.append('csrfToken', token);

    submit(formData, { method: 'post' });
  };

  return onSubmit;
};
