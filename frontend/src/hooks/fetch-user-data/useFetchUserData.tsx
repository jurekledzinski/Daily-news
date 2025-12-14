import { fetchApi, URLS } from '@api';
import { getCookie } from '@helpers';
import { useCallback, useEffect } from 'react';
import { useUserStore } from '@store';

export const useFetchUserData = () => {
  const { setUser } = useUserStore();

  const loadUser = useCallback(async () => {
    const result = await fetchApi({
      url: URLS.FETCH_USER(),
      credentials: 'include',
      mode: 'cors',
    });

    if (result.success) setUser(result.payload);
  }, [setUser]);

  useEffect(() => {
    const enabled = getCookie('enable');
    if (!enabled) return;
    loadUser();
  }, [loadUser]);
};
