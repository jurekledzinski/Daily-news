import { ActionData } from '@api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { User } from '@models';
import { useResetForm } from '@hooks';
import { UserProfileFormValues, UseUserProfileFormProps } from './types';

export const useUserProfile = ({ onFailed, onSuccess }: UseUserProfileFormProps) => {
  const methods = useForm<UserProfileFormValues>({ defaultValues: { email: '', name: '', surname: '' } });

  const fetcher = useFetcher<ActionData<Pick<User, 'email' | 'name' | 'surname'>>>();

  const onSubmit: SubmitHandler<UserProfileFormValues> = (data) => {
    const formData = new FormData();
    formData.append('actionType', 'update-profile');
    formData.set('email', data.email);
    formData.set('name', data.name);
    formData.set('surname', data.surname);
    fetcher.submit(formData, { method: 'post', action: '/', preventScrollReset: true });
  };

  useResetForm({
    isSubmitSuccessful: methods.formState.isSubmitSuccessful,
    isSuccess: fetcher.data?.success,
    onFailed: () => onFailed(fetcher.unstable_reset, fetcher.data),
    onSuccess: () => onSuccess(fetcher.unstable_reset, fetcher.data),
    reset: methods.reset,
    state: fetcher.state,
  });

  return { methods, onSubmit: methods.handleSubmit(onSubmit), status: fetcher.state };
};
