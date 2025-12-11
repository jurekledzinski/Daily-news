import { Control, FieldValues, Path, UseFormGetValues, UseFormTrigger, Validate } from 'react-hook-form';

export type PasswordValidationStatusProps<T extends FieldValues> = {
  control: Control<T, unknown, T>;
  getValues: UseFormGetValues<T>;
  nameConfirmPassword: Path<T>;
  namePassword: Path<T>;
  passwordRules: Record<string, Validate<string, T>>;
  trigger: UseFormTrigger<T>;
};
