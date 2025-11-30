import { useLogin } from '../forms';

export type LoginModalProps = {
  form: ReturnType<typeof useLogin>;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
};
