import { forwardRef } from 'react';
import { InputBase } from '../input/components';
import { textareaClassNames } from '../input/utils';
import { TextareaProps } from '../input/types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ disabled, isError, size, variant, placeholder = '', ...props }, ref) => {
    const classNames = textareaClassNames({ variant, size, isError, disabled });

    return (
      <InputBase
        isError={isError}
        disabled={disabled}
        label={props.label}
        size={size}
        variant={variant}
      >
        <textarea
          {...props}
          ref={ref}
          aria-label={props.label}
          className={classNames}
          disabled={disabled}
          placeholder={placeholder}
          required
        />
      </InputBase>
    );
  }
);

Textarea.displayName = 'Textarea';
