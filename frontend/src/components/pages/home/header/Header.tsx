import styles from './Header.module.css';
import { AppBar, Heading } from '@components/shared';
import { LoginModal } from '../login-modal';
import { RegisterModal } from '../register-modal';
import { useLogoutUser } from '@pages/home';

import {
  ActionsNavigation,
  MobileNavigation,
  DesktopNavigation,
  useModalControl,
  useLogin,
  useRegister,
  useAuthNavigation,
} from '@components/pages';

const isLoggedIn = false;

export const Header = () => {
  const navigate = useAuthNavigation();
  const login = useLogin({ onSuccess: () => {}, status: 'idle' });
  const register = useRegister({ onSuccess: () => {}, status: 'idle' });
  const modal = useModalControl({ login: login.methods, register: register.methods });
  const logoutUser = useLogoutUser({ onSuccess: navigate.navigateLogout });

  return (
    <AppBar className={styles.header}>
      <nav className={styles.nav}>
        <Heading className={styles.heading} level={4}>
          Daily News
        </Heading>
        <ActionsNavigation navigateBack={navigate.navigateBack} />
        <MobileNavigation
          isLoggedIn={isLoggedIn}
          navigateProfile={navigate.navigateProfile}
          onLogout={logoutUser}
          onOpenModalSignIn={modal.handleOpenSignIn}
          onOpenModalSignUp={modal.handleOpenSignUp}
        />
        <DesktopNavigation
          isLoggedIn={isLoggedIn}
          onLogout={logoutUser}
          navigateProfile={navigate.navigateProfile}
          onOpenModalSignIn={modal.handleOpenSignIn}
          onOpenModalSignUp={modal.handleOpenSignUp}
        />
      </nav>
      {!isLoggedIn && (
        <LoginModal
          form={login}
          isOpen={modal.isOpen && modal.modalType === 'login'}
          isPending={false}
          onClose={modal.handleClose}
        />
      )}
      {!isLoggedIn && (
        <RegisterModal
          form={register}
          isOpen={modal.isOpen && modal.modalType === 'register'}
          isPending={false}
          onClose={modal.handleClose}
        />
      )}
    </AppBar>
  );
};
