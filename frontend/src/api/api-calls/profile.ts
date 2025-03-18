import {
  ApiResError,
  APIResSuccess,
  DataPassword,
  DataProfile,
} from '../types';
import { fetchApi } from './helpers';
import { tryCatch } from '@/helpers';
import { URLS } from '../urls';

export const updateUserProfile = tryCatch<
  APIResSuccess,
  ApiResError,
  { id: string; body: DataProfile }
>(async (data: { id: string; body: DataProfile }) => {
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
  APIResSuccess,
  ApiResError,
  { id: string; body: DataPassword }
>(async (data: { id: string; body: DataPassword }) => {
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
  APIResSuccess,
  ApiResError,
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
