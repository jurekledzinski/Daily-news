import styles from './Header.module.css';
import { ActionData } from '@api';
import { AppBar, Heading } from '@components/shared';
import { LoginModal } from '../login-modal';
import { RegisterModal } from '../register-modal';
import { useActionData, useNavigation } from 'react-router';
import { useLogoutUser } from '@pages/home';
import { User } from '@models';

import {
  ActionsNavigation,
  MobileNavigation,
  DesktopNavigation,
  useModalControl,
  useLogin,
  useRegister,
  useAuthNavigation,
  useAuthCallbacks,
} from '@components/pages';

export const Header = () => {
  const status = useNavigation();
  const action = useActionData<ActionData<User>>();
  const navigate = useAuthNavigation();
  const modal = useModalControl();
  const fn = useAuthCallbacks({ action, modal });

  const login = useLogin({ onFailed: fn.failedLogin, onSuccess: fn.successLogin, status, action });
  const register = useRegister({
    onFailed: fn.failedRegister,
    onSuccess: fn.successRegister,
    status,
    action,
  });
  const logoutUser = useLogoutUser({
    onFailed: fn.failedLogout,
    onSuccess: navigate.navigateLogout,
    action,
  });

  console.log('action', action);
  console.log('user', fn.state);

  return (
    <AppBar className={styles.header}>
      <nav className={styles.nav}>
        <Heading className={styles.heading} level={4}>
          Daily News
        </Heading>
        <ActionsNavigation navigateBack={navigate.navigateBack} />
        <MobileNavigation
          isLoggedIn={!!fn.state.user}
          navigateProfile={navigate.navigateProfile}
          onLogout={logoutUser}
          onOpenModalSignIn={modal.handleOpenSignIn}
          onOpenModalSignUp={modal.handleOpenSignUp}
        />
        <DesktopNavigation
          isLoggedIn={!!fn.state.user}
          onLogout={logoutUser}
          navigateProfile={navigate.navigateProfile}
          onOpenModalSignIn={modal.handleOpenSignIn}
          onOpenModalSignUp={modal.handleOpenSignUp}
        />
      </nav>
      {!fn.state.user && (
        <LoginModal
          form={login}
          isOpen={modal.isOpen && modal.modalType === 'login'}
          isPending={status.state === 'submitting'}
          onClose={modal.handleClose}
        />
      )}
      {!fn.state.user && (
        <RegisterModal
          form={register}
          isOpen={modal.isOpen && modal.modalType === 'register'}
          isPending={status.state === 'submitting'}
          onClose={modal.handleClose}
        />
      )}
    </AppBar>
  );
};
