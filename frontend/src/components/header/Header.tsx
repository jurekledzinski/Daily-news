import './Header.css';
import { useRef, useState } from 'react';
import Modal from '../modal';
import { RegisterForm, LoginForm } from '../forms';
import { useRegisterForm, useLoginForm } from '../../hooks';
import { FormProvider } from 'react-hook-form';

export const Header = () => {
  const dialogLoginRef = useRef<HTMLDialogElement | null>(null);
  const dialogRegisterRef = useRef<HTMLDialogElement | null>(null);
  const timeout1 = useRef<number | null>(null);
  const timeout2 = useRef<number | null>(null);
  const [controlDialog, setControlDialog] = useState<null | boolean>(null);

  const formSignUpControl = useRegisterForm({
    onSuccess: () => dialogRegisterRef.current?.close(),
  });
  const formSignInControl = useLoginForm({
    onSuccess: () => dialogLoginRef.current?.close(),
  });

  return (
    <>
      <header className="header">
        <nav className="header__nav">
          <h4 className="header__logo">Daily news</h4>
          <div className="header__buttons">
            <button className="header__button">Profile</button>
            <button
              className="header__button"
              onClick={() => {
                if (timeout1.current) clearTimeout(timeout1.current);
                setControlDialog(false);

                timeout1.current = setTimeout(() => {
                  if (!dialogLoginRef.current) return;
                  dialogLoginRef.current.showModal();
                });
              }}
            >
              Sign in
            </button>
            <button
              className="header__button"
              onClick={() => {
                if (timeout2.current) clearTimeout(timeout2.current);
                setControlDialog(true);

                timeout2.current = setTimeout(() => {
                  if (!dialogRegisterRef.current) return;
                  dialogRegisterRef.current.showModal();
                });
              }}
            >
              Sign up
            </button>
          </div>
        </nav>
      </header>

      {controlDialog === null ? null : controlDialog ? (
        <Modal
          ref={dialogRegisterRef}
          onClose={formSignUpControl.formMethods.reset}
          title="Sign up"
        >
          <FormProvider {...formSignUpControl.formMethods}>
            <RegisterForm onSubmit={formSignUpControl.onSubmit} />
          </FormProvider>
        </Modal>
      ) : (
        <Modal
          ref={dialogLoginRef}
          onClose={formSignInControl.formMethods.reset}
          title="Sign in"
        >
          <FormProvider {...formSignInControl.formMethods}>
            <LoginForm onSubmit={formSignInControl.onSubmit} />
          </FormProvider>
        </Modal>
      )}
    </>
  );
};
