import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconClassNames } from './utils';
import { IconProps } from './types';

export const Icon = ({ className, color, ...props }: IconProps) => {
  const classNames = iconClassNames({ className, color });

  return <FontAwesomeIcon className={classNames} {...props} />;
};
