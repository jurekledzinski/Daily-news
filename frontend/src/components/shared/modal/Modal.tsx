import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { ModalProps } from './types';

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      form,
      onClose,
      className,
      cancelButton = 'Cancel',
      confirmButton = 'Confirm',
      openButton = 'Open modal',
      children,
      title,
    },
    ref: Ref<HTMLDialogElement>
  ) => {
    const localRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => localRef.current!);

    return (
      <>
        <button
          className="button-open-modal"
          onClick={() => {
            if (!localRef.current) return;
            localRef.current.showModal();
          }}
        >
          {openButton}
        </button>
        <dialog
          className={['modal', className].filter(Boolean).join(' ')}
          role="dialog"
          ref={localRef}
        >
          <header className="modal__header">
            <h5 className="modal__title">{title}</h5>
          </header>
          <div className="modal__body">{children}</div>
          <footer className="modal__footer">
            <button className="modal__button" form={form} type="submit">
              {confirmButton}
            </button>
            <button
              autoFocus
              className="modal__button"
              onClick={() => {
                if (!localRef.current) return;
                localRef.current.close();
                onClose && onClose();
              }}
            >
              {cancelButton}
            </button>
          </footer>
        </dialog>
      </>
    );
  }
);
