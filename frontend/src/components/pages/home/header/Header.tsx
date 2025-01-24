import { getCookie } from '@helpers/index';
import { HeaderProps } from './types';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { NavBarActions, NavBarAuth } from '@components/pages';
import { toast } from 'react-toastify';
import { useCallback, useRef, useState } from 'react';
import { useControlServerError } from '@hooks/index';
import { useUserStore } from '@store/index';
import './Header.css';
import {
  useFetchUserData,
  useLoginForm,
  useLogoutUser,
  useRegisterForm,
} from '@hooks/index';

export const Header = ({ matchHome, matchProfile }: HeaderProps) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dialogLoginRef = useRef<HTMLDialogElement | null>(null);
  const dialogRegisterRef = useRef<HTMLDialogElement | null>(null);
  const isLog = getCookie('tsge');
  useFetchUserData({ isLoggedIn: Boolean(isLog) });
  const { onGetCookie, onRemoveCookie } = useControlServerError('serverError');
  const { state, dispatch } = useUserStore();
  const [, setIsLoggedOut] = useState(false);

  const logoutUser = useLogoutUser({
    onSuccess: () => {
      dispatch({ type: 'LOGOUT_USER' });
      toast.success('Logout successful', {
        position: 'top-right',
      });
      setIsLoggedOut((prev) => !prev);
      if (matchProfile) navigate('/', { replace: true });
    },
  });

  const submitRegister = useRegisterForm({
    status: navigation.state,
    error: onGetCookie('register-user'),
    onSuccess: useCallback((reset) => {
      dialogRegisterRef.current?.close();
      reset();
      toast.success('Registration successful', {
        position: 'top-right',
      });
    }, []),
  });

  const submitLogin = useLoginForm({
    status: navigation.state,
    error: onGetCookie('login-user'),
    onSuccess: useCallback((reset) => {
      dialogLoginRef.current?.close();
      reset();
      toast.success('Login successful', {
        position: 'top-right',
      });
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
          <h2 className="header__logo">
            <Link to="/">Daily news</Link>
          </h2>
          <div className="header__buttons">
            <NavBarActions
              isLoggedInUser={Boolean(isLog)}
              onBack={() => navigate(-1)}
              onClick={() => navigate(`profile/${state.user?.id}`)}
            />
            <NavBarAuth
              isLoggedInUser={Boolean(isLog)}
              logout={logoutUser}
              modalLoginRef={dialogLoginRef}
              modalRegisterRef={dialogRegisterRef}
              onGetCookie={onGetCookie}
              onRemoveCookie={onRemoveCookie}
              submitLogin={submitLogin}
              submitRegister={submitRegister}
            />
          </div>
        </nav>
      </header>
    </>
  );
};
