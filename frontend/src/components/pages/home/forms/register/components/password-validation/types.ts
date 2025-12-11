import { Control, UseFormGetValues, UseFormTrigger } from 'react-hook-form';
import { RegisterFormValues } from '@components/pages';

export type PasswordValidationProps = {
  control: Control<RegisterFormValues, unknown, RegisterFormValues>;
  getValues: UseFormGetValues<RegisterFormValues>;
  trigger: UseFormTrigger<RegisterFormValues>;
};
