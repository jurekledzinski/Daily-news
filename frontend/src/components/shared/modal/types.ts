export type ModalProps = {
  className?: string;
  confirmButton?: string;
  cancelButton?: string;
  children: React.ReactNode;
  form: string;
  title: string;
  onClose?: () => void;
  openButton?: string;
};
