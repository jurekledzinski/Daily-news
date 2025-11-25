import { forwardRef } from 'react';
import { InputBase } from './components';
import { inputClassNames } from './utils';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, isError, size, variant, placeholder = '', label, ...props }, ref) => {
    const classNames = inputClassNames({ variant, size, isError, disabled });

    return (
      <InputBase isError={isError} disabled={disabled} label={label} size={size} variant={variant}>
        <input
          {...props}
          ref={ref}
          aria-label={label}
          className={classNames}
          disabled={disabled}
          placeholder={placeholder}
          required
        />
      </InputBase>
    );
  }
);

Input.displayName = 'Input';
