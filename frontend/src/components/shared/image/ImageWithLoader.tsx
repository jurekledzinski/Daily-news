import { Image } from './Image';
import { ImageContainer } from './components';
import { ImageWithLoaderProps } from './types';
import { Loader } from '../loader';

export const ImageWithLoader = ({ src }: ImageWithLoaderProps) => {
  return (
    <ImageContainer loader="loader" style={{ aspectRatio: '16/9' }}>
      {({ onLoad, onError, isLoading, isError }) => {
        return (
          <>
            {isLoading && <Loader position="element" />}
            {isError && !isLoading ? (
              <>Error</>
            ) : (
              <Image src={src === undefined ? undefined : src} onLoad={onLoad} onError={onError} />
            )}
          </>
        );
      }}
    </ImageContainer>
  );
};
