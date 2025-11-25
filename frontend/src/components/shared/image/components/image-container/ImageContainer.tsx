import { imageContainerClassNames } from '../../utils';
import { ImageContainerProps } from './types';
import { useImageContainer } from '../../hooks';

export const ImageContainer = ({ children, className, loader, ...props }: ImageContainerProps) => {
  const { isError, isLoading, onError, onLoad } = useImageContainer();
  const classNames = imageContainerClassNames({ className, isLoading, loader });

  return (
    <div {...props} className={classNames}>
      {children && typeof children === 'function'
        ? children({ isError, isLoading, onLoad, onError })
        : null}
    </div>
  );
};
