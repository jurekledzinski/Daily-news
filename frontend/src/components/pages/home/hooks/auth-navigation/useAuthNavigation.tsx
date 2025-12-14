import { ActionData } from '@api';
import { asyncStoragePersister, queryClient } from '@routes';
import { clear } from 'idb-keyval';
import { defaultErrorMessage, showErrorToast, showSuccessToast } from '@helpers';
import { FetcherReset } from '../auth-callbacks';
import { useMatch, useNavigate } from 'react-router';
import { User } from '@models';
import { useRef } from 'react';
import { useUserStore } from '@store';

export const useAuthNavigation = () => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null);
  const navigate = useNavigate();
  const matchProfile = useMatch('/profile/:id');
  const { user, logoutUser } = useUserStore();

  const navigateLogout = async (reset: FetcherReset, data?: ActionData<User>) => {
    if (!data) return showErrorToast(defaultErrorMessage('logout'));
    reset();

    queryClient.clear();
    await asyncStoragePersister.removeClient();

    timeoutId.current = setTimeout(async () => {
      await clear();
      if (timeoutId.current) clearTimeout(timeoutId.current);
    }, 1500);

    logoutUser();

    showSuccessToast(data.message);

    localStorage.clear();

    if (matchProfile) navigate('/', { replace: true, viewTransition: true });
  };

  const navigateProfile = () => navigate(`profile/${user?.id}`, { viewTransition: true });
  const navigateBack = () => navigate('/', { viewTransition: true });

  return { navigateBack, navigateLogout, navigateProfile };
};
