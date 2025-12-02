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
    console.log('state', state);
    console.log('isSubmitSuccessful', isSubmitSuccessful);
    if (state !== 'idle' || !isSubmitSuccessful) return;

    if (isSuccess) {
      onSuccess();
      reset();
    }

    if (!isSuccess) onFailed();
  }, [isSuccess, isSubmitSuccessful, reset, onFailed, onSuccess, state]);
};
