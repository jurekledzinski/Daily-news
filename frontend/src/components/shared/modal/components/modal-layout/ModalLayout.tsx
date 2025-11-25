import { forwardRef } from 'react';
import { ModalBody } from '../modal-body';
import { ModalFooter } from '../modal-footer';
import { ModalHeader } from '../modal-header';
import { ModalLayoutProps } from './types';

export const ModalLayout = forwardRef<HTMLDivElement, ModalLayoutProps>(
  (
    {
      children,
      className,
      color = 'primary',
      onClose,
      title = 'Modal title',
      variant,
      ...footerProps
    },
    ref
  ) => {
    return (
      <div className={className} ref={ref}>
        <ModalHeader title={title} onClose={onClose} color={color} variant={variant} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter {...footerProps} color={color} />
      </div>
    );
  }
);

ModalLayout.displayName = 'ModalLayout';
