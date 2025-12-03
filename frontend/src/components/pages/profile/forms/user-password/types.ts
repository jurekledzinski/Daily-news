import { FormEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { UserPasswordFormValues } from '../hooks';

export type UserPasswordFormProps = {
  controls: UseFormReturn<UserPasswordFormValues, unknown, UserPasswordFormValues>;
  isPending: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};
