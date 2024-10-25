import { tryCatch } from '../helpers';
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
} from './types';

export const getCategoriesArticles = tryCatch<
  APIGuardianResponseSuccess<CategoriesData[]>,
  APIErrorResponse
>(async () => {
  const response = await fetch(URLS.GET_CATEGORIES_ARTICLES());

  const data = await response.json();

  return data;
});

export const getArticles = async (category: string, page: string) => {
  const response = await fetch(URLS.GET_ARTICLES(category, page));

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIGuardianResponsePagniationSuccess<IArticles[]> =
    await response.json();

  return data;
};

export const getDetailsArticle = async (_: string, id: string) => {
  const response = await fetch(URLS.GET_DETAILS_ARTICLE(id));

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseDetailsSuccess<IDetailsArticle> =
    await response.json();

  return data;
};

export const getComments = async (articleId: string, page: string) => {
  const id = encodeURIComponent(articleId);

  const response = await fetch(URLS.GET_COMMENTS(id, page), {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseDetailsSuccess<IDetailsArticle> =
    await response.json();

  return data;
};

export const getCommentReplies = async (
  articleId: string,
  commentId: string,
  page: string
) => {
  const id = encodeURIComponent(articleId);

  const response = await fetch(URLS.GET_COMMENT_REPLIES(id, commentId, page), {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseDetailsSuccess<IDetailsArticle> =
    await response.json();

  return data;
};

export const createComment = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  CommentCreate
>(async (body: CommentCreate) => {
  const response = await fetch(URLS.CREATE_COMMENT(), {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...body, likes: parseInt(body.likes) }),
    headers: {
      'Content-Type': 'application/json',
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

// ----------------- Actions user profile -----------------

export const updateUserProfile = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  { id: string; body: DataProfile }
>(async (data: { id: string; body: DataProfile }) => {
  const response = await fetch(URLS.UPDATE_USER_PROFILE(data.id), {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data.body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
});

export const changeUserPassword = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  { id: string; body: DataPassword }
>(async (data: { id: string; body: DataPassword }) => {
  const response = await fetch(URLS.CHANGE_USER_PASSWORD(data.id), {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data.body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
});

export const deleteUserAccount = tryCatch<
  APISuccessResponse,
  APIErrorResponse,
  string
>(async (id: string) => {
  const response = await fetch(URLS.DELETE_USER_ACCOUNT(id), {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
  });

  return await response.json();
});

// ----------------- Actions register -----------------

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
