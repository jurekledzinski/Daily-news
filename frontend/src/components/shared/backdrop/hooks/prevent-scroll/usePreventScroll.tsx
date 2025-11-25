import { useEffect } from 'react';
import { UsePreventScrollProps } from './types';

export const usePreventScroll = ({ open }: UsePreventScrollProps) => {
  useEffect(() => {
    if (open) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }, [open]);
};
