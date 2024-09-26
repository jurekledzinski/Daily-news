import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../loader';
import { useState } from 'react';
import './Image.css';

type ImageProps = {
  altText: string;
  className: string;
  src: string;
};

export const Image = ({ altText, className, src }: ImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {src && loading && !error && <Loader />}
      {!error ? (
        <img
          alt={altText}
          className={className}
          src={src}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      ) : (
        <FontAwesomeIcon icon={faImage} />
      )}
    </>
  );
};
