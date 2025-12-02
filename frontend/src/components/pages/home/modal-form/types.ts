export type ModalFormProps = {
  form: string;
  isPending: boolean;
  label: string;
  onClose: () => void;
  open: boolean;
  subTitle: string;
  title: string;
  children?: React.ReactNode;
};
