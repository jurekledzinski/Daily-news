import { Control, UseFormRegister } from 'react-hook-form';
import { RegisterFormValues } from '@components/pages';

export type ConfirmPasswordFieldProps = {
  control: Control<RegisterFormValues, unknown, RegisterFormValues>;
  register: UseFormRegister<RegisterFormValues>;
};
