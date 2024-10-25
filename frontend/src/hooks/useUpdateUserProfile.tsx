import { InputsProfile } from '../components/pages';
import { useForm } from 'react-hook-form';
import { UserState } from '../store';
import { useSubmit } from 'react-router-dom';

type useUpdateUserProfileProps = {
  initialData: UserState;
};

export const useUpdateUserProfile = ({
  initialData,
}: useUpdateUserProfileProps) => {
  const methods = useForm<InputsProfile>({
    values: {
      email: initialData.user?.email ?? '',
      name: initialData.user?.name ?? '',
    },
  });
  const submit = useSubmit();

  const onSubmit = (data: InputsProfile) => {
    const formData = new FormData();
    formData.append('actionType', 'update-profile');
    formData.set('name', data.name);
    formData.set('email', data.email);

    submit(formData, { method: 'post' });
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
