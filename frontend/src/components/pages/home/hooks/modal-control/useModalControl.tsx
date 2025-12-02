import { useControlModal } from '@components/shared';
import { useState } from 'react';

export const useModalControl = () => {
  const [modalType, setModalType] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useControlModal({});

  const handleClose = () => {
    onClose();
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
