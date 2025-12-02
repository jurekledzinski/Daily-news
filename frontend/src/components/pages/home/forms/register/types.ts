import { FormEventHandler } from 'react';
import { RegisterFormValues } from '../hooks';
import { UseFormReturn } from 'react-hook-form';

export type RegisterFormProps = {
  controls: UseFormReturn<RegisterFormValues, unknown, RegisterFormValues>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};
