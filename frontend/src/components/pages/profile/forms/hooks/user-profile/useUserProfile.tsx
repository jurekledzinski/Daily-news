import { ActionData } from '@api';
import { initialTokenFailed } from '@components/pages';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { User } from '@models';
import { useResetForm } from '@hooks';
import { UserProfileFormValues, UseUserProfileFormProps } from './types';
import { useEffect } from 'react';

export const useUserProfile = ({ onFailed, onSuccess, token, user }: UseUserProfileFormProps) => {
  const methods = useForm<UserProfileFormValues>({
    defaultValues: { email: '', name: '', surname: '' },
  });

  const fetcher = useFetcher<ActionData<Pick<User, 'email' | 'name' | 'surname'>>>();

  const onSubmit: SubmitHandler<UserProfileFormValues> = (data) => {
    if (!token) return onFailed(fetcher.unstable_reset, initialTokenFailed);
    const formData = new FormData();
    formData.append('actionType', 'update-profile');
    formData.set('email', data.email);
    formData.set('name', data.name);
    formData.set('surname', data.surname);
    formData.set('csrfToken', token);
    fetcher.submit(formData, { method: 'PATCH', preventScrollReset: true });
  };

  useEffect(() => {
    if (!user) return;
    methods.reset({ email: user.email, name: user.name, surname: user.surname });
  }, [user]);

  useResetForm({
    isSubmitSuccessful: methods.formState.isSubmitSuccessful,
    isSuccess: fetcher.data?.success,
    onFailed: () => onFailed(fetcher.unstable_reset, fetcher.data),
    onSuccess: () => onSuccess(fetcher.unstable_reset, fetcher.data),
    state: fetcher.state,
  });

  return { methods, onSubmit: methods.handleSubmit(onSubmit), status: fetcher.state };
};
