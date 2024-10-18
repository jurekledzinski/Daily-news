import { URLS } from './urls';
import {
  APIGuardianResponseSuccess,
  CategoriesData,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIGuardianResponsePagniationSuccess,
  CommentCreate,
  APICreateResponseSuccess,
  Likes,
  APIUpdateResponseSuccess,
} from './types';

export const getCategoriesArticles = async () => {
  try {
    const response = await fetch(URLS.GET_CATEGORIES_ARTICLES());

    if (!response.ok) {
      throw new Error('Failed to load page data.');
    }

    const data: APIGuardianResponseSuccess<CategoriesData[]> =
      await response.json();

    return data;
  } catch (error) {
    return false;
  }
};

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

export const createComment = async (body: CommentCreate) => {
  const response = await fetch(URLS.CREATE_COMMENT(), {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...body, likes: parseInt(body.likes) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APICreateResponseSuccess = await response.json();

  return data;
};

export const updateLikesComment = async (articleId: string, body: Likes) => {
  const id = encodeURIComponent(articleId);

  const response = await fetch(URLS.UPDATE_COMMENT_LIKE(id, body.commentId), {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ likes: parseInt(body.likes.toString()) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIUpdateResponseSuccess = await response.json();

  return data;
};
