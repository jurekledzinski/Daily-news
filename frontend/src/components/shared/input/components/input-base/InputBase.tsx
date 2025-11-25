import { forwardRef } from 'react';
import { inputBaseClassNames } from '../../utils';
import { InputBaseProps } from './types';

export const InputBase = forwardRef<HTMLFieldSetElement, InputBaseProps>(
  ({ children, disabled, isError, label, size, variant, ...props }, ref) => {
    const classNames = inputBaseClassNames({ variant, size, isError, disabled });

    return (
      <fieldset {...props} className={classNames.fieldset} ref={ref}>
        {children}
        {variant !== 'basic' && <legend className={classNames.legend}>{label}</legend>}
      </fieldset>
    );
  }
);

InputBase.displayName = 'InputBase';
