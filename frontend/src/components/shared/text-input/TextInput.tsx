import { ControlLayout, IconEnd, IconLoader, IconStart, IconStatus } from '@components/shared';
import { forwardRef } from 'react';
import { Input } from '../input';
import { TextInputProps } from './types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ endIcon, isPending, startIcon, onClick, ...props }, ref) => {
    return (
      <ControlLayout
        {...props}
        as="input"
        isPending={isPending}
        isEndIcon={!!endIcon || props.isError !== undefined}
        isStartIcon={!!startIcon}
        isStatus={true}
      >
        {startIcon ? <IconStart icon={startIcon} /> : null}
        <Input {...props} ref={ref} />
        <IconLoader />
        <IconStatus />
        {endIcon ? <IconEnd icon={endIcon} onClick={onClick} /> : null}
      </ControlLayout>
    );
  }
);

TextInput.displayName = 'TextInput';
