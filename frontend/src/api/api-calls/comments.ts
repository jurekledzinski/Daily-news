import { APIErrorResponse, APISuccessResponse } from '../api';
import { Comment } from '@/models';
import { fetchApi } from './helpers';
import { Likes } from '@models';
import { tryCatch } from '@/helpers';
import { URLS } from '../urls';

export const createComment = tryCatch<
  Omit<APISuccessResponse<unknown>, 'payload'>,
  APIErrorResponse,
  Omit<Comment, 'id'>
>(async (data) => {
  const { csrfToken, ...body } = data;

  return await fetchApi({
    url: URLS.CREATE_COMMENT(),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...body, likes: parseInt(body.likes) }),
    csrfToken,
  });
});

export const updateLikesComment = tryCatch<
  Omit<APISuccessResponse<unknown>, 'payload'>,
  APIErrorResponse,
  { articleId: string; body: Likes }
>(async (data: { articleId: string; body: Likes }) => {
  const id = encodeURIComponent(data.articleId);

  return await fetchApi({
    url: URLS.UPDATE_COMMENT_LIKE(id, data.body.commentId),
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({
      likes: parseInt(data.body.likes.toString()),
    }),
  });
});
