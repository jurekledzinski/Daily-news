import { APIErrorResponse, APISuccessResponse, URLS } from '../api';
import { useQuery } from '@tanstack/react-query';

export const useFetchUserData = () => {
  const data = useQuery<
    APISuccessResponse<{ email: string; name: string }>,
    APIErrorResponse
  >({
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

      return await response.json();
    },
    retry: false,
  });

  return data;
};
