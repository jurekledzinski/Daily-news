import { LoginForm, RegisterForm } from '../forms';
import { Modal } from '../../../shared';
import { NavBarAuthProps } from './types';

export const NavBarAuth = ({
  logout,
  modalLoginRef,
  modalRegisterRef,
  onGetCookie,
  onRemoveCookie,
  submitLogin,
  submitRegister,
  user,
}: NavBarAuthProps) => {
  return (
    <div className="header__auth">
      {user && (
        <button
          className="header__logout"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      )}

      {!user && (
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

      {!user && (
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
