import styles from './Header.module.css';
import { AppBar, Heading } from '@components/shared';
import { LoginModal } from '../login-modal';
import { RegisterModal } from '../register-modal';
import { useLogout } from '@components/pages';

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
  const navigate = useAuthNavigation();
  const modal = useModalControl();
  const fn = useAuthCallbacks({ modal });
  const login = useLogin({ onFailed: fn.failedLogin, onSuccess: fn.successLogin });
  const register = useRegister({ onFailed: fn.failedRegister, onSuccess: fn.successRegister });
  const logoutUser = useLogout({ onFailed: fn.failedLogout, onSuccess: navigate.navigateLogout });

  return (
    <AppBar className={styles.header}>
      <nav className={styles.nav}>
        <Heading className={styles.heading} level={4}>
          Daily News
        </Heading>
        {!!fn.state.user && <p className={styles.user}>Welcome, {fn.state.user.name}!</p>}
        <ActionsNavigation navigateBack={navigate.navigateBack} />
        <MobileNavigation
          isLoggedIn={!!fn.state.user}
          navigateProfile={navigate.navigateProfile}
          onLogout={logoutUser}
          onOpenModalSignIn={modal.handleOpenSignIn}
          onOpenModalSignUp={modal.handleOpenSignUp}
          userName={fn.state.user?.name}
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
          isPending={login.status === 'submitting'}
          onClose={() => fn.closeModal(login.methods.reset)}
        />
      )}
      {!fn.state.user && (
        <RegisterModal
          form={register}
          isOpen={modal.isOpen && modal.modalType === 'register'}
          isPending={register.status === 'submitting'}
          onClose={() => fn.closeModal(register.methods.reset)}
        />
      )}
    </AppBar>
  );
};
