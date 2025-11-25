import { UseControlModalProps } from './types';
import { useMemo, useState } from 'react';
import { useModalEffectStatus } from './useModalEffectStatus';

export const useControlModal = ({ ...props }: UseControlModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useModalEffectStatus(props);

  return useMemo(
    () => ({
      isOpen,
      onClose: () => setIsOpen(false),
      onOpen: () => setIsOpen(true),
    }),
    [isOpen]
  );
};
