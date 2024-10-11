import {
  APIGuardianResponseSuccess,
  ICategories,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIGuardianResponsePagniationSuccess,
  ICommentCreate,
  APICreateResponseSuccess,
  ILikes,
  APIUpdateResponseSuccess,
} from './types';

export const getCategoriesArticles = async () => {
  try {
    const response = await fetch(
      `https://content.guardianapis.com/sections?&format=json&api-key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error('Failed to load page data.');
    }

    const data: APIGuardianResponseSuccess<ICategories[]> =
      await response.json();

    return data;
  } catch (error) {
    return false;
  }
};

export const getArticles = async (category: string, page: string) => {
  const response = await fetch(
    `https://content.guardianapis.com/${category}?show-fields=body,headline,trailText&show-elements=image&page=${page}&page-size=12&api-key=${
      import.meta.env.VITE_API_KEY
    }`
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIGuardianResponsePagniationSuccess<IArticles[]> =
    await response.json();

  return data;
};

export const getDetailsArticle = async (_: string, id: string) => {
  const response = await fetch(
    `https://content.guardianapis.com/${id}?show-fields=body,trailText&show-elements=image&api-key=${
      import.meta.env.VITE_API_KEY
    }`
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseDetailsSuccess<IDetailsArticle> =
    await response.json();

  return data;
};

export const getComments = async (articleId: string, page: string) => {
  const id = encodeURIComponent(articleId);

  const response = await fetch(
    `http://localhost:5000/api/v1/comments/${id}?page=${page}`,
    { method: 'GET', mode: 'cors', credentials: 'include' }
  );

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

  const response = await fetch(
    `http://localhost:5000/api/v1/comments/${id}/${commentId}?page_reply=${page}`,
    { method: 'GET', mode: 'cors', credentials: 'include' }
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseDetailsSuccess<IDetailsArticle> =
    await response.json();

  return data;
};

export const createComment = async (body: ICommentCreate) => {
  const response = await fetch('http://localhost:5000/api/v1/comments/create', {
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

export const updateLikesComment = async (articleId: string, body: ILikes) => {
  const id = encodeURIComponent(articleId);

  const response = await fetch(
    `http://localhost:5000/api/v1/comments/likes/${id}/${body.commentId}`,
    {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ likes: parseInt(body.likes.toString()) }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIUpdateResponseSuccess = await response.json();

  return data;
};
