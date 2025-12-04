import { fetchApi } from '../api-calls';
import { getCookie } from '@helpers';
import { LoaderFunction } from 'react-router';
import { URLS } from '../urls';

const loadToken = async () => {
  const enabled = getCookie('enable');
  if (!enabled) return { success: false };

  const data = await fetchApi({ url: URLS.GET_CSRF_TOKEN() });

  if ('message' in data) return { success: false };
  return { data: data.payload, success: true };
};

export const loaderProfilePage: LoaderFunction = async () => {
  return await loadToken();
};
