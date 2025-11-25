import { ControlLayout, IconEnd, IconLoader, IconStatus } from '@components/shared';
import { forwardRef } from 'react';
import { Textarea } from '../textarea';
import { TextareaInputProps } from './types';

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ endIcon, isPending, startIcon, onClick, ...props }, ref) => {
    return (
      <ControlLayout
        {...props}
        as="textarea"
        isPending={isPending}
        isEndIcon={!!endIcon}
        isStartIcon={!!startIcon}
        isStatus={true}
      >
        <Textarea {...props} ref={ref} />
        <IconLoader />
        <IconStatus />
        {endIcon ? <IconEnd icon={endIcon} onClick={onClick} /> : null}
      </ControlLayout>
    );
  }
);

TextareaInput.displayName = 'TextareaInput';
