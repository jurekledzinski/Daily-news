import { imageClassNames } from './utils';
import { ImageProps } from './types';

export const Image = ({ className, ...props }: ImageProps) => {
  const classNames = imageClassNames(className);

  return <img {...props} className={classNames} />;
};
