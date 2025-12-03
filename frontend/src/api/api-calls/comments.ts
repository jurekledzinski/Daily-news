import { APIErrorResponse, APISuccessResponse } from '../api';
import { Comment } from '@models';
import { fetchApi } from './helpers';
import { tryCatch } from '@helpers';
import { URLS } from '../urls';

export const createComment = tryCatch<
  Omit<APISuccessResponse, 'payload'>,
  APIErrorResponse,
  Omit<Comment, 'id'>
>(async (data) => {
  const { csrfToken, ...body } = data;

  return await fetchApi({
    url: URLS.CREATE_COMMENT(),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    csrfToken,
  });
});
