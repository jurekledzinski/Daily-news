import { Color } from '@types';

type Params = { color?: Color; variant?: 'contained' | 'outlined' };

export type ModalHeaderClassNames = (params: Params) => {
  header: string;
  title: string;
};

export type ModalClassNames = (className?: string) => {
  modal: CSSModuleClasses;
  modalElement: string | undefined;
};
