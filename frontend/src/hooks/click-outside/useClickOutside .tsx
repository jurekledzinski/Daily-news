import { UseClickOutsideProps } from './types';
import { useEffect } from 'react';

export const useClickOutside = ({
  onClick,
  onLoadRefs,
}: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      const target = event.target as Node;

      const refs = onLoadRefs();

      const isClickOutside = refs.some((ref) => ref && ref?.contains(target));

      if (!isClickOutside) onClick();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClick, onLoadRefs]);
};
