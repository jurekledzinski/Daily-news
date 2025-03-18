import { ApiResError, APIResSuccess, DataLogin, User } from '../types';
import { fetchApi } from './helpers';
import { tryCatch } from '@/helpers';
import { URLS } from '../urls';

export const registerUser = tryCatch<APIResSuccess, ApiResError, User>(
  async (body: User) => {
    return await fetchApi({
      url: URLS.CREATE_USER(),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body),
    });
  }
);

export const loginUser = tryCatch<APIResSuccess, ApiResError, DataLogin>(
  async (body: DataLogin) => {
    return await fetchApi({
      url: URLS.LOGIN_USER(),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body),
    });
  }
);

export const logoutUser = tryCatch<APIResSuccess, ApiResError>(async () => {
  return await fetchApi({
    url: URLS.LOGOUT_USER(),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });
});
