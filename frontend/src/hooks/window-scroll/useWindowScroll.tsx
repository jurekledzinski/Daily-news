import { useEffect } from 'react';
import { UseWindowScroll } from './types';

export const useWindowScroll = ({ onScroll }: UseWindowScroll) => {
  useEffect(() => {
    window.addEventListener('scroll', onScroll, true);
  }, [onScroll]);
};
