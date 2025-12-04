import { FieldValues } from 'react-hook-form';
import { useEffect } from 'react';
import { UseResetFormProps } from './types';

export const useResetForm = <T extends FieldValues>({
  isSubmitSuccessful,
  isSuccess,
  reset,
  state,
  onFailed,
  onSuccess,
}: UseResetFormProps<T>) => {
  useEffect(() => {
    if (state !== 'idle' || !isSubmitSuccessful) return;
    if (isSuccess) onSuccess();
    if (isSuccess && reset) reset();
    if (isSuccess === false) onFailed();
  }, [isSuccess, isSubmitSuccessful, reset, onFailed, onSuccess, state]);
};
