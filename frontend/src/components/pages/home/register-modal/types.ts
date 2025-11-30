import { useRegister } from '../forms';

export type RegisterModalProps = {
  form: ReturnType<typeof useRegister>;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
};
