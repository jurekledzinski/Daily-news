import { getCookie, removeCookie } from '../../../../helpers';
import { NavBarActions, NavBarAuth } from '../NavBar';
import { PathMatch, useNavigate, useNavigation } from 'react-router-dom';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useUserStore } from '../../../../store';
import './Header.css';
import {
  useFetchUserData,
  useLoginForm,
  useLogoutUser,
  useRegisterForm,
} from '../../../../hooks';

type HeaderProps = {
  matchHome: PathMatch<string> | null;
  matchProfile: PathMatch<string> | null;
};

export const Header = ({ matchHome, matchProfile }: HeaderProps) => {
  const navigate = useNavigate();
  const dialogLoginRef = useRef<HTMLDialogElement | null>(null);
  const dialogRegisterRef = useRef<HTMLDialogElement | null>(null);
  const navigation = useNavigation();
  const { onGetCookie, onRemoveCookie } = useControlServerError('serverError');

  useFetchUserData();
  const { state, dispatch } = useUserStore();

  const logoutUser = useLogoutUser({
    onSuccess: () => {
      dispatch({ type: 'LOGOUT_USER' });
      if (matchProfile) navigate('/', { replace: true });
    },
  });

  const submitRegister = useRegisterForm({
    status: navigation.state,
    error: onGetCookie('register-user'),
    onSuccess: useCallback((reset) => {
      dialogRegisterRef.current?.close();
      reset();
    }, []),
  });

  const submitLogin = useLoginForm({
    status: navigation.state,
    error: onGetCookie('login-user'),
    onSuccess: useCallback((reset) => {
      dialogLoginRef.current?.close();
      reset();
    }, []),
  });

  return (
    <>
      <header
        className={
          matchHome || matchProfile ? 'header' : 'header header--fixed'
        }
      >
        <nav className="header__nav">
          <h4 className="header__logo">Daily news</h4>
          <div className="header__buttons">
            <NavBarActions
              onBack={() => navigate(-1)}
              onClick={() => navigate(`profile/${state.user?.id}`)}
              user={state.user}
            />
            <NavBarAuth
              logout={logoutUser}
              modalLoginRef={dialogLoginRef}
              modalRegisterRef={dialogRegisterRef}
              onGetCookie={onGetCookie}
              onRemoveCookie={onRemoveCookie}
              submitLogin={submitLogin}
              submitRegister={submitRegister}
              user={state.user}
            />
          </div>
        </nav>
      </header>
    </>
  );
};

function useControlServerError(cookieName: string) {
  const [, setFlag] = useState(false);

  const onRemoveCookie = useCallback(() => {
    removeCookie(cookieName);
    setFlag((prev) => !prev);
  }, [cookieName]);

  const onGetCookie = useCallback(
    (action: string): { message: string; action: string } | null =>
      action && action === getCookie(cookieName)?.action
        ? getCookie(cookieName)
        : null,
    [cookieName]
  );

  return useMemo(
    () => ({
      onGetCookie,
      onRemoveCookie,
    }),
    [onGetCookie, onRemoveCookie]
  );
}

// {state.user && (
//     <button
//       className="header__logout"
//       onClick={() => {
//         logoutUser();
//       }}
//     >
//       Logout
//     </button>
//   )}

//   {!state.user && (
//     <Modal
//       openButton=" Sign in"
//       form="login"
//       ref={dialogLoginRef}
//       onClose={() => {
//         onRemoveCookie();
//         submitLogin.methods.reset();
//       }}
//       title="Sign in"
//     >
//       <LoginForm
//         id="login"
//         methods={submitLogin.methods}
//         onSubmit={submitLogin.onSubmit}
//         {...(onGetCookie('login-user') && {
//           serverError: onGetCookie('login-user')?.message,
//         })}
//       />
//     </Modal>
//   )}

//   {!state.user && (
//     <Modal
//       openButton="Sign up"
//       form="register"
//       ref={dialogRegisterRef}
//       onClose={() => {
//         onRemoveCookie();
//         submitRegister.methods.reset();
//       }}
//       title="Sign up"
//     >
//       <RegisterForm
//         id="register"
//         methods={submitRegister.methods}
//         onSubmit={submitRegister.onSubmit}
//         {...(onGetCookie('register-user') && {
//           serverError: onGetCookie('register-user')?.message,
//         })}
//       />
//     </Modal>
//   )}
// {state.user && (
//     <button
//       className="header__profile"
//       onClick={() => navigate(`profile/${state.user?.id}`)}
//     >
//       Profile
//     </button>
//   )}
