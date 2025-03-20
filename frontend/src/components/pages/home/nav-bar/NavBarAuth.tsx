import { LoginForm, RegisterForm } from '@/components/pages';
import { Modal } from '@/components/shared';
import { NavBarAuthProps } from './types';
import '../header/Header.css';

export const NavBarAuth = ({
  isLoggedInUser,
  logout,
  modalLoginRef,
  modalRegisterRef,
  onGetCookie,
  onRemoveCookie,
  submitLogin,
  submitRegister,
}: NavBarAuthProps) => {
  return (
    <div className="header__auth">
      {isLoggedInUser && (
        <button className="header__logout" onClick={() => logout()}>
          Logout
        </button>
      )}

      {!isLoggedInUser && (
        <Modal
          form="login"
          onClose={() => {
            onRemoveCookie();
            submitLogin.methods.reset();
          }}
          openButton=" Sign in"
          ref={modalLoginRef}
          title="Sign in"
        >
          <LoginForm
            id="login"
            methods={submitLogin.methods}
            onSubmit={submitLogin.onSubmit}
            {...(onGetCookie('login-user') && {
              serverError: onGetCookie('login-user')?.message,
            })}
          />
        </Modal>
      )}

      {!isLoggedInUser && (
        <Modal
          form="register"
          onClose={() => {
            onRemoveCookie();
            submitRegister.methods.reset();
          }}
          openButton="Sign up"
          ref={modalRegisterRef}
          title="Sign up"
        >
          <RegisterForm
            id="register"
            methods={submitRegister.methods}
            onSubmit={submitRegister.onSubmit}
            {...(onGetCookie('register-user') && {
              serverError: onGetCookie('register-user')?.message,
            })}
          />
        </Modal>
      )}
    </div>
  );
};
