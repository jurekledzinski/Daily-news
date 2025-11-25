import { loaderClassNames, loaderInlineStyles } from './utils';
import { LoaderProps } from './types';

export const Loader = ({
  border,
  className,
  colorSpin,
  colorTrack,
  position,
  size,
  style,
}: LoaderProps) => {
  const classNames = loaderClassNames({ border, className, position, size });
  const styles = loaderInlineStyles({ colorSpin, colorTrack, size, style });

  return <span className={classNames} style={styles}></span>;
};
