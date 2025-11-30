import { LoginForm } from '../forms';
import { ModalForm } from '../modal-form';
import { LoginModalProps } from './types';
import { modalConfig } from './utils';

export const LoginModal = ({ form, isOpen, isPending, onClose }: LoginModalProps) => {
  return (
    <ModalForm onClose={onClose} open={isOpen} {...modalConfig}>
      <LoginForm controls={form.methods} isPending={isPending} onSubmit={form.onSubmit} />
    </ModalForm>
  );
};
