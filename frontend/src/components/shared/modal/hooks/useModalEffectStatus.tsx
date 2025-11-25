import { useEffect } from 'react';
import { UseModalEffectStatusProps } from './types';

export const useModalEffectStatus = ({
  isPending = false,
  isSuccess,
  onFailed,
  onSuccess,
  open,
}: UseModalEffectStatusProps) => {
  useEffect(() => {
    if (open) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');

    if (open && isSuccess && !isPending && onSuccess) onSuccess();
    if (open && isSuccess === false && !isPending && onFailed) onFailed();
  }, [isPending, isSuccess, open, onFailed, onSuccess]);
};
