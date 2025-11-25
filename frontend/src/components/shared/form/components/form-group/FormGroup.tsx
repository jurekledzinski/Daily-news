import { formGroupClassNames } from '../../utils';
import { FormGroupProps } from './types';

export const FormGroup = ({ className, children, orientation }: FormGroupProps) => {
  const classNames = formGroupClassNames({ className, orientation });

  return <div className={classNames}>{children}</div>;
};
