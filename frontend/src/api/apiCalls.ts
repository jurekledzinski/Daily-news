import {
  APIResponseSuccess,
  ICategories,
  IArticles,
  APIResponseDetailsSuccess,
  IDetailsArticle,
  APIResponsePagniationSuccess,
} from './types';

export const getCategoriesArticles = async () => {
  const response = await fetch(
    `https://content.guardianapis.com/sections?&format=json&api-key=${
      import.meta.env.VITE_API_KEY
    }`
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseSuccess<ICategories[]> = await response.json();

  return data;
};

export const getArticles = async (category: string, page: string) => {
  const response = await fetch(
    `https://content.guardianapis.com/${category}?show-fields=body,headline,trailText&show-elements=image&page=${page}&page-size=12&api-key=${
      import.meta.env.VITE_API_KEY
    }`
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponsePagniationSuccess<IArticles[]> = await response.json();

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

// TODO: Check if credentials necessery in get comments

export const getComments = async (articleId: string, page: string) => {
  const id = encodeURIComponent(articleId);
  const response = await fetch(
    `http://localhost:5000/api/v1/comments/${id}?page=${page}`,
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseDetailsSuccess<IDetailsArticle> =
    await response.json();

  return data;
};

export const getCommentReplies = async (
  articleId: string,
  commentId: string
) => {
  const id = encodeURIComponent(articleId);
  const response = await fetch(
    `http://localhost:5000/api/v1/comments/${id}/${commentId}`,
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  );

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data: APIResponseDetailsSuccess<IDetailsArticle> =
    await response.json();

  return data;
};

export const createComment = async (body: unknown) => {
  console.log('body create comment', body);
  const response = await fetch('http://localhost:5000/api/v1/comments/create', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...body }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Something went wrong, please try later.');

  const data = await response.json();

  console.log('create res', data);

  return data;
};
