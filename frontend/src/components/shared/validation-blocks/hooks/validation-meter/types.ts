import { Validate } from 'react-hook-form';

export type UseValidationMeterProps<T> = {
  formValues: T;
  mapRules: Record<string, Validate<string, T>>;
  value: string;
};
