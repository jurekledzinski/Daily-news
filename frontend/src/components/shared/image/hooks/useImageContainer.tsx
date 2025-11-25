import { useState } from 'react';

export const useImageContainer = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  return { isError, isLoading, onLoad, onError };
};
