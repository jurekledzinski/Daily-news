import { fetchApi, URLS } from '@api';
import { getCookie } from '@helpers';
import { useCallback, useEffect } from 'react';
import { useUserStore } from '@store';

export const useFetchUserData = () => {
  const { dispatch } = useUserStore();

  const loadUser = useCallback(async () => {
    const result = await fetchApi({
      url: URLS.FETCH_USER(),
      credentials: 'include',
      mode: 'cors',
    });

    if (result.success) dispatch({ type: 'SET_USER', payload: result.payload });
  }, [dispatch]);

  useEffect(() => {
    const enabled = getCookie('enable');
    if (!enabled) return;
    loadUser();
  }, [loadUser]);
};
