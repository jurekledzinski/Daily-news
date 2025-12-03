import { APIErrorResponse, APISuccessResponse } from '../api';
import { fetchApi } from './helpers';
import { tryCatch } from '@helpers';
import { URLS } from '../urls';
import { User } from '@models';

export const updateUserProfile = tryCatch<
  Omit<APISuccessResponse<unknown>, 'payload'>,
  APIErrorResponse,
  { id: string; body: Omit<User, 'id' | 'password'> }
>(async (data: { id: string; body: Omit<User, 'id' | 'password'> }) => {
  const { csrfToken, ...body } = data.body;

  return await fetchApi({
    url: URLS.UPDATE_USER_PROFILE(data.id),
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    csrfToken,
  });
});

export const changeUserPassword = tryCatch<
  Omit<APISuccessResponse<unknown>, 'payload'>,
  APIErrorResponse,
  { id: string; body: Pick<User, 'password' | 'csrfToken'> }
>(async (data: { id: string; body: Pick<User, 'password' | 'csrfToken'> }) => {
  const { csrfToken, ...body } = data.body;

  return await fetchApi({
    url: URLS.CHANGE_USER_PASSWORD(data.id),
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    csrfToken,
  });
});

export const deleteUserAccount = tryCatch<
  Omit<APISuccessResponse<unknown>, 'payload'>,
  APIErrorResponse,
  { id: string; token: string }
>(async (data: { id: string; token: string }) => {
  return await fetchApi({
    url: URLS.DELETE_USER_ACCOUNT(data.id),
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    csrfToken: data.token,
  });
});
