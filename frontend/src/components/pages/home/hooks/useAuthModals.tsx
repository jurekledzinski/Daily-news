import { useControlModal } from '@/components/shared';
import { useLogin, useRegister } from '../forms';
import { useRef, useState } from 'react';

export const useAuthModals = () => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const [modalType, setModalType] = useState<string | null>(null);
  const login = useLogin({ onSuccess: () => {}, status: 'idle' });
  const register = useRegister({ onSuccess: () => {}, status: 'idle' });
  const { isOpen, onOpen, onClose } = useControlModal({});

  const handleClose = () => {
    timeoutId.current = setTimeout(() => {
      if (modalType === 'login') login.methods.reset();
      else register.methods.reset();
    }, 500);

    setModalType(null);
    onClose;
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
    form: { login, register },
  };
};
