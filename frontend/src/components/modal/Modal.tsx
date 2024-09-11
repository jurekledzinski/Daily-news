import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';

type ModalProps = {
  children: React.ReactNode;
  title: string;
};

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, title }, ref: Ref<HTMLDialogElement>) => {
    const localRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => localRef.current!);

    const handleCloseModal = () => {
      if (!localRef.current) return;
      localRef.current.close();
    };

    return (
      <dialog className="modal" role="dialog" ref={localRef}>
        <header className="modal__header">
          <h5 className="modal__title">{title}</h5>
        </header>
        <div className="modal__content">{children}</div>
        <footer className="modal__footer">
          <button className="modal__button" form="form" type="submit">
            Submit
          </button>
          <button
            autoFocus
            className="modal__button"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </footer>
      </dialog>
    );
  }
);
