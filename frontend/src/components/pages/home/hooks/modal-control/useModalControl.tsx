import { useControlModal } from '@components/shared';
import { UseModalControlProps } from './types';
import { useRef, useState } from 'react';

export const useModalControl = ({ login, register }: UseModalControlProps) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useControlModal({});

  const resetForms = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      if (modalType === 'login') login.reset();
      else register.reset();
      if (!timeoutId.current) return;
      timeoutId.current = null;
    }, 500);
  };

  const handleClose = () => {
    onClose();
    resetForms();
    setModalType(null);
  };

  const handleOpenSignIn = () => {
    onOpen();
    setModalType('login');
  };

  const handleOpenSignUp = () => {
    onOpen();
    setModalType('register');
  };

  return {
    isOpen,
    modalType,
    handleClose,
    handleOpenSignIn,
    handleOpenSignUp,
  };
};
