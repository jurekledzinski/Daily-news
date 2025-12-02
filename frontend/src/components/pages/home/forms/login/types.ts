import { FormEventHandler } from 'react';
import { LoginFormValues } from '../hooks';
import { UseFormReturn } from 'react-hook-form';

export type LoginFormProps = {
  controls: UseFormReturn<LoginFormValues, unknown, LoginFormValues>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};
