import { tryCatch } from '@helpers/index';
import { URLS } from './urls';
import {
  APIGuardianResponseSuccess,
  CategoriesData,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIGuardianResponsePagniationSuccess,
  CommentCreate,
  APISuccessResponse,
  Likes,
  DataPassword,
  DataProfile,
  DataLogin,
  User,
  APIErrorResponse,
  APIGuardianResponseError,
  APIResponsePagniationSuccess,
} from './types';

// ----------------- Api articles -----------------

export const getCategoriesArticles = tryCatch<
  APIGuardianResponseSuccess<CategoriesData[]>,
  null
>(async () => {
  const response = await fetch(URLS.GET_CATEGORIES_ARTICLES());

  return await response.json();
});

export const getArticles = tryCatch<
  APIGuardianResponsePagniationSuccess<IArticles[]>,
  null,
  { category: string; page: string }
>(async (data: { category: string; page: string }) => {
  const response = await fetch(URLS.GET_ARTICLES(data.category, data.page));

  return await response.json();
});

export const getDetailsArticle = tryCatch<
  APIResponseDetailsSuccess<IDetailsArticle>,
  APIGuardianResponseError,
  string
>(async (id: string) => {
  const response = await fetch(URLS.GET_DETAILS_ARTICLE(id));

  return await response.json();
});

// ----------------- Api comments -----------------

export const getComments = tryCatch<
  APIResponsePagniationSuccess<Comment[]>,
  null,
  { articleId: string; page: string }
>(async (data: { articleId: string; page: string }) => {
  const id = encodeURIComponent(data.articleId);
  const ur = URLS.GET_COMMENTS(id, data.page);

  console.log('get comments fetch api url', ur);

  const response = await fetch(URLS.GET_COMMENTS(id, data.page), {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  console.log('Get comments response fetch', response);
  const result = await response.json();
  console.log('result get comments fetch', result);
  return result;
});

export const getCommentReplies = tryCatch<
  APIResponsePagniationSuccess<Comment[]>,
  null,
  { articleId: string; commentId: string; page: string }
>(async (data: { articleId: string; commentId: string; page: string }) => {
  const id = encodeURIComponent(data.articleId);

  const response = await fetch(
    URLS.GET_COMMENT_REPLIES(id, data.commentId, data.page),
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  );

  return await response.json();
});

export const createComment = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  CommentCreate
>(async (data: CommentCreate) => {
  const { csrfToken, ...body } = data;

  const response = await fetch(URLS.CREATE_COMMENT(), {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...body, likes: parseInt(body.likes) }),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
  });

  return await response.json();
});

export const updateLikesComment = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  { articleId: string; body: Likes }
>(async (data: { articleId: string; body: Likes }) => {
  const id = encodeURIComponent(data.articleId);

  const response = await fetch(
    URLS.UPDATE_COMMENT_LIKE(id, data.body.commentId),
    {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        likes: parseInt(data.body.likes.toString()),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return await response.json();
});

// ----------------- Api user profile -----------------

export const updateUserProfile = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  { id: string; body: DataProfile }
>(async (data: { id: string; body: DataProfile }) => {
  const { csrfToken, ...body } = data.body;

  console.log('update profile api call', data);

  const response = await fetch(URLS.UPDATE_USER_PROFILE(data.id), {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
  });

  return await response.json();
});

export const changeUserPassword = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  { id: string; body: DataPassword }
>(async (data: { id: string; body: DataPassword }) => {
  const { csrfToken, ...body } = data.body;

  const response = await fetch(URLS.CHANGE_USER_PASSWORD(data.id), {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
  });

  return await response.json();
});

export const deleteUserAccount = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  { id: string; token: string }
>(async (data: { id: string; token: string }) => {
  const response = await fetch(URLS.DELETE_USER_ACCOUNT(data.id), {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': data.token,
    },
  });

  return await response.json();
});

// ----------------- Api register login logout -----------------

export const registerUser = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  User
>(async (body: User) => {
  const response = await fetch(URLS.CREATE_USER(), {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
});

export const loginUser = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  DataLogin
>(async (body: DataLogin) => {
  const response = await fetch(URLS.LOGIN_USER(), {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
});

export const logoutUser = tryCatch<APISuccessResponse, APIErrorResponse>(
  async () => {
    const response = await fetch(URLS.LOGOUT_USER(), {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }
);
