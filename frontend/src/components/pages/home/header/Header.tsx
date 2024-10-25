import { NavBarActions, NavBarAuth } from '../nav-bar';
import { PathMatch, useNavigate, useNavigation } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { useControlServerError } from '../../../../hooks/useControlServerError';
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
  const navigation = useNavigation();
  const dialogLoginRef = useRef<HTMLDialogElement | null>(null);
  const dialogRegisterRef = useRef<HTMLDialogElement | null>(null);
  useFetchUserData();

  const { onGetCookie, onRemoveCookie } = useControlServerError('serverError');
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
