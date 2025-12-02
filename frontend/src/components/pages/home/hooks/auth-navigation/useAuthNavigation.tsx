import { showSuccessToast } from '@helpers';
import { useMatch, useNavigate } from 'react-router';
import { useUserStore } from '@/store';

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const matchProfile = useMatch('/profile/:id');
  const { dispatch } = useUserStore();

  const navigateLogout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    showSuccessToast('Logout successful');
    if (matchProfile) navigate('/', { replace: true });
    else navigate(window.location.pathname, { replace: true });
  };

  const navigateProfile = () => navigate(`profile/${'userId'}`);
  const navigateBack = () => navigate('/', { viewTransition: true });

  return { navigateBack, navigateLogout, navigateProfile };
};
