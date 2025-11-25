import { Icon } from '@types';

export type ModalFormProps = {
  form: string;
  icon: Icon;
  label: string;
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  subTitle: string;
  title: string;
  children?: React.ReactNode;
};
