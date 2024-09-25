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

export const getDetailsArticle = async (category: string, id: string) => {
  console.log('Get details article fn', category, id);

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
