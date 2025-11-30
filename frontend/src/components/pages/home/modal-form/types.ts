export type ModalFormProps = {
  form: string;
  label: string;
  onClose: () => void;
  open: boolean;
  subTitle: string;
  title: string;
  children?: React.ReactNode;
};
