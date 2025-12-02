import { RegisterForm } from '../forms';
import { ModalForm } from '../modal-form';
import { RegisterModalProps } from './types';
import { modalConfig } from './utils';

export const RegisterModal = ({ form, isOpen, isPending, onClose }: RegisterModalProps) => {
  return (
    <ModalForm onClose={onClose} open={isOpen} {...modalConfig} isPending={isPending}>
      <RegisterForm controls={form.methods} onSubmit={form.onSubmit} />
    </ModalForm>
  );
};
