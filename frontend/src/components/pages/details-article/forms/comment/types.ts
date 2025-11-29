import { CommentFormValues } from '../hooks';
import { FormEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type CommentFormProps = {
  controls: UseFormReturn<CommentFormValues, unknown, CommentFormValues>;
  isPending: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};
