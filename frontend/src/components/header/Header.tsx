import './Header.css';
import { useRef, useState } from 'react';
import Modal from '../modal';
import { RegisterForm, LoginForm } from '../forms';
import { useRegisterForm, useLoginForm } from '../../hooks';
import { FormProvider } from 'react-hook-form';

export const Header = () => {
  const dialogLoginRef = useRef<HTMLDialogElement | null>(null);
  const dialogRegisterRef = useRef<HTMLDialogElement | null>(null);
  const [controlDialog, setControlDialog] = useState<null | boolean>(null);

  const formSignUpControl = useRegisterForm();
  const formSignInControl = useLoginForm();
  console.log('controlDialog', controlDialog);

  //   useEffect(() => {
  //     if (controlDialog) {
  //       if (!dialogRegisterRef.current) return;
  //       dialogRegisterRef.current.showModal();
  //     }

  //     if (!controlDialog && controlDialog !== null) {
  //       if (!dialogLoginRef.current) return;
  //       dialogLoginRef.current.showModal();
  //     }
  //   }, [controlDialog]);

  //   TODO: Jesli tak z useEffect to jeszcze jeden hook dla tej logiki

  //   dialogRegisterRef.current.open by sprawdzic czy zamkniety dialog

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
                setControlDialog(false);
                // if (!dialogLoginRef.current) return;
                // dialogLoginRef.current.showModal();
                setTimeout(() => {
                  if (!dialogLoginRef.current) return;
                  dialogLoginRef.current.showModal();
                }, 10);
              }}
            >
              Sign in
            </button>
            <button
              className="header__button"
              onClick={() => {
                setControlDialog(true);
                // if (!dialogRegisterRef.current) return;
                // dialogRegisterRef.current.showModal();
                setTimeout(() => {
                  if (!dialogRegisterRef.current) return;
                  dialogRegisterRef.current.showModal();
                }, 10);
              }}
            >
              Sign up
            </button>
          </div>
        </nav>
      </header>

      {controlDialog === null ? null : controlDialog ? (
        <Modal ref={dialogRegisterRef} title="Sign up">
          <FormProvider {...formSignUpControl.formMethods}>
            <RegisterForm onSubmit={formSignUpControl.onSubmit} />
          </FormProvider>
        </Modal>
      ) : (
        <Modal ref={dialogLoginRef} title="Sign in">
          <FormProvider {...formSignInControl.formMethods}>
            <LoginForm onSubmit={formSignInControl.onSubmit} />
          </FormProvider>
        </Modal>
      )}
    </>
  );
};
