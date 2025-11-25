import { useEffect } from 'react';
import { UseWindowResizeProps } from './types';

export const useWindowResize = ({ onResize }: UseWindowResizeProps) => {
  useEffect(() => {
    const handleResize = () => onResize(document.documentElement);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onResize]);
};
