import { ApiResError, APIResSuccess, CommentCreate, Likes } from '../types';
import { fetchApi } from './helpers';
import { tryCatch } from '@/helpers';
import { URLS } from '../urls';

export const createComment = tryCatch<
  APIResSuccess,
  ApiResError,
  CommentCreate
>(async (data: CommentCreate) => {
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
  APIResSuccess,
  ApiResError,
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
