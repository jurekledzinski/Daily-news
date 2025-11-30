import { showSuccessToast } from '@helpers';
import { useMatch, useNavigate } from 'react-router';

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const matchProfile = useMatch('/profile/:id');

  const navigateLogout = () => {
    showSuccessToast('Logout successful');
    if (matchProfile) navigate('/', { replace: true });
  };

  const navigateProfile = () => navigate(`profile/${'userId'}`);
  const navigateBack = () => navigate('/', { viewTransition: true });

  return { navigateBack, navigateLogout, navigateProfile };
};
