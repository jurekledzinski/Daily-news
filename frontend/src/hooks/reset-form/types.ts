import { FieldValues, UseFormReturn } from 'react-hook-form';

export type UseResetFormProps<T extends FieldValues> = {
  isSubmitSuccessful: boolean;
  isSuccess: boolean;
  onFailed: () => void;
  onSuccess: () => void;
  reset: UseFormReturn<T, unknown, T>['reset'];
  state: 'idle' | 'loading' | 'submitting';
};
