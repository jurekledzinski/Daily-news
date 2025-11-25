import { APIErrorResponse, APISuccessResponse, URLS } from '@/api';
import { useEffect } from 'react';
import { UseFetchUserDataProps } from './types';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store';

export const useFetchUserData = ({ isLoggedIn }: UseFetchUserDataProps) => {
  const { dispatch } = useUserStore();

  const result = useQuery<APISuccessResponse<{ email: string; name: string }>, APIErrorResponse>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch(URLS.FETCH_USER(), {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      return await response.json();
    },
    enabled: isLoggedIn,
    retry: false,
  });

  useEffect(() => {
    if (result.isLoading) return;
    if (result.isError) return dispatch({ type: 'SET_USER', payload: null });
    if (!result.data) return;

    dispatch({ type: 'SET_USER', payload: result.data.payload.result });
  }, [dispatch, result.data, result.isError, result.isLoading]);
};
