import { asyncStoragePersister, queryClient } from '@routes';
import { clear } from 'idb-keyval';
import { showSuccessToast } from '@helpers';
import { useRef } from 'react';
import { useMatch, useNavigate } from 'react-router';
import { useUserStore } from '@store';

export const useAuthNavigation = () => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null);
  const navigate = useNavigate();
  const matchProfile = useMatch('/profile/:id');
  const { dispatch, state } = useUserStore();

  const navigateLogout = async () => {
    queryClient.clear();
    await asyncStoragePersister.removeClient();

    timeoutId.current = setTimeout(async () => {
      await clear();
      if (timeoutId.current) clearTimeout(timeoutId.current);
    }, 1500);

    dispatch({ type: 'LOGOUT_USER' });
    showSuccessToast('Logout successful');
    localStorage.clear();

    if (matchProfile) navigate('/', { replace: true, viewTransition: true });
    else navigate(window.location.pathname, { replace: true, viewTransition: true });
  };

  const navigateProfile = () => navigate(`profile/${state.user?.id}`, { viewTransition: true });
  const navigateBack = () => navigate('/', { viewTransition: true });

  return { navigateBack, navigateLogout, navigateProfile };
};
