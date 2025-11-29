import { FormEventHandler } from 'react';
import { LoginFormValues } from '../hooks';
import { UseFormReturn } from 'react-hook-form';

export type LoginFormProps = {
  controls: UseFormReturn<LoginFormValues, unknown, undefined>;
  isPending: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};
