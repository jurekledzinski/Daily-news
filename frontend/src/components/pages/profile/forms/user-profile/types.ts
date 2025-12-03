import { FormEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { UserProfileFormValues } from '../hooks';

export type UserProfileFormProps = {
  controls: UseFormReturn<UserProfileFormValues, unknown, UserProfileFormValues>;
  isPending: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};
