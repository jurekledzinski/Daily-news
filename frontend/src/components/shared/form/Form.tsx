import { formClassNames } from './utils';
import { FormProps } from './types';
import { Form as FormRouter } from 'react-router';

export const Form = ({ className, children, orientation, ...props }: FormProps) => {
  const classNames = formClassNames({ className, orientation });

  return (
    <FormRouter className={classNames} {...props}>
      {children}
    </FormRouter>
  );
};
