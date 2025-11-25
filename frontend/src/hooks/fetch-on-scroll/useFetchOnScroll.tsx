import { useEffect, useRef } from 'react';
import { useFetchOnScrollProps } from './types';

const threshold = 38;

export const useFetchOnScroll = ({ onReachBottom }: useFetchOnScrollProps) => {
  const isReachedBottom = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (
        !isReachedBottom.current &&
        window.scrollY + window.innerHeight + threshold >= document.body.scrollHeight
      ) {
        isReachedBottom.current = true;
        onReachBottom();
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [onReachBottom]);
};
