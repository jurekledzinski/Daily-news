import { APICSRFTokenResponse, APIErrorResponse, URLS } from '../api';
import { useQuery } from '@tanstack/react-query';

export const useFetchProtection = () => {
  const data = useQuery<APICSRFTokenResponse, APIErrorResponse>({
    queryKey: ['crsf-token'],
    queryFn: async () => {
      const response = await fetch(URLS.GET_CSRF_TOKEN(), {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return await response.json();
    },
    enabled: document.cookie.split('=').includes('time'),
  });

  return data;
};
