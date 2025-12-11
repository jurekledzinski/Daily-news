import { validationBlockClassNames } from '../../utils';
import { ValidationBlockProps } from './types';

export const ValidationBlock = ({ color, isValid, label }: ValidationBlockProps) => {
  const classNames = validationBlockClassNames({ color, isValid });
  return (
    <div className={classNames}>
      <span>{label}</span>
    </div>
  );
};
