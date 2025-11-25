import styles from './Header.module.css';
import { AppBar, ButtonGroup, Heading } from '@components/shared';
import { NavActions, NavAuth } from '@components/pages';
import { showSuccessToast } from '@helpers';
import { useLogoutUser } from '@/pages/home';
import { useMatch, useNavigate } from 'react-router';
import { useUserStore } from '@/store';

export const Header = () => {
  const matchProfile = useMatch('/profile/:id');
  const navigate = useNavigate();

  const { dispatch, state } = useUserStore();

  const logoutUser = useLogoutUser({
    onSuccess: () => {
      dispatch({ type: 'LOGOUT_USER' });
      showSuccessToast('Logout successful');
      if (matchProfile) navigate('/', { replace: true });
    },
  });

  return (
    <AppBar className={styles.header}>
      <nav className={styles.nav}>
        <Heading className={styles.heading} level={4}>
          Daily News
        </Heading>
        <ButtonGroup spacing="normal">
          <NavActions
            isLoggedIn={false}
            onBack={() => navigate('/')}
            onNavigateProfile={() => navigate(`profile/${state.user?.id}`)}
          />
          <NavAuth isLoggedIn={false} onLogout={logoutUser} />
        </ButtonGroup>
      </nav>
    </AppBar>
  );
};
