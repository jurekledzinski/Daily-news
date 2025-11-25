import { Color } from '@types';
import { MouseEventHandler } from 'react';

export type ModalFooterProps = {
  cancelText?: string;
  color?: Color;
  confirmText?: string;
  form?: string;
  isPending?: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};
