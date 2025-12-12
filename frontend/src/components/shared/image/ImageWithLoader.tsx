import { Alert, AlertButton, AlertIcon, AlertMessage } from '../alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Image } from './Image';
import { ImageContainer } from './components';
import { ImageWithLoaderProps } from './types';
import { Loader } from '../loader';

export const ImageWithLoader = ({ loader, src }: ImageWithLoaderProps) => {
  return (
    <ImageContainer loader={loader} style={{ aspectRatio: '16/9' }}>
      {({ onLoad, onError, isLoading, isError }) => {
        return (
          <>
            {isLoading && loader === 'loader' && <Loader position="element" />}
            {isError && !isLoading ? (
              <Alert color="negative" variant="contained" fullWidth>
                <AlertIcon icon={faTriangleExclamation} color="negative" />
                <AlertMessage message="Failed to load image" />
                <AlertButton color="negative" variant="text" />
              </Alert>
            ) : (
              <Image loading="lazy" src={src === undefined ? undefined : src} onLoad={onLoad} onError={onError} />
            )}
          </>
        );
      }}
    </ImageContainer>
  );
};
