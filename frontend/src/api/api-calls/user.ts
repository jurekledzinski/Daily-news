import { APIErrorResponse, APISuccessResponse } from '../api';
import { User } from '../types';
import { fetchApi } from './helpers';
import { tryCatch } from '@/helpers';
import { URLS } from '../urls';

export const registerUser = tryCatch<
  Omit<APISuccessResponse<unknown>, 'payload'>,
  APIErrorResponse,
  User
>(async (body: User) => {
  return await fetchApi({
    url: URLS.CREATE_USER(),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
  });
});

export const loginUser = tryCatch<
  Omit<APISuccessResponse<unknown>, 'payload'>,
  APIErrorResponse,
  Omit<User, 'id' | 'name'>
>(async (body: Omit<User, 'id' | 'name'>) => {
  return await fetchApi({
    url: URLS.LOGIN_USER(),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
  });
});

export const logoutUser = tryCatch<Omit<APISuccessResponse<unknown>, 'payload'>, APIErrorResponse>(
  async () => {
    return await fetchApi({
      url: URLS.LOGOUT_USER(),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });
  }
);
