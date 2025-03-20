import { APIResCSRFToken, ApiResError, URLS } from '@/api';
import { useQuery } from '@tanstack/react-query';

type UseFetchProtectionProps = {
  isLoggedIn: boolean;
};

export const useFetchProtection = ({ isLoggedIn }: UseFetchProtectionProps) => {
  const data = useQuery<APIResCSRFToken, ApiResError>({
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
    enabled: isLoggedIn,
  });

  return { token: data.data?.token ?? '' };
};
