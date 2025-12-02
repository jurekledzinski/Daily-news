import { APIErrorResponse, APISuccessResponse } from '../api';
import { fetchApi } from './helpers';
import { tryCatch } from '@helpers';
import { URLS } from '../urls';
import { User } from '@models';

type APISuccessWithoutPayload = Omit<APISuccessResponse, 'payload'>;

export const registerUser = tryCatch<APISuccessWithoutPayload, APIErrorResponse, User>(
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

export const loginUser = tryCatch<APISuccessResponse, APIErrorResponse, Omit<User, 'id' | 'name'>>(
  async (body: Omit<User, 'id' | 'name'>) => {
    return await fetchApi({
      url: URLS.LOGIN_USER(),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body),
    });
  }
);

export const logoutUser = tryCatch<APISuccessWithoutPayload, APIErrorResponse>(async () => {
  return await fetchApi({
    url: URLS.LOGOUT_USER(),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });
});
