const sections = [
  'art-and-design',
  'australia-news',
  'cities',
  'environment',
  'fashion',
  'film',
  'food',
  'football',
  'games',
  'music',
  'news',
  'politics',
  'science',
  'sport',
  'technology',
  'travel',
  'uk-news',
  'weather',
  'world',
];

export const URLS = {
  FETCH_USER: () => `/api/v1/users`,
  CREATE_USER: () => `/api/v1/register`,
  LOGIN_USER: () => `/api/v1/login`,
  LOGOUT_USER: () => `/api/v1/users/logout`,
  UPDATE_USER_PROFILE: (id: string) => {
    const url = `/api/v1/users/update_profile/${id}`;
    return url;
  },
  CHANGE_USER_PASSWORD: (id: string) => {
    const url = `/api/v1/users/change_password/${id}`;
    return url;
  },
  DELETE_USER_ACCOUNT: (id: string) => {
    const url = `/api/v1/users/delete_user/${id}`;
    return url;
  },
  GET_CSRF_TOKEN: () => `/api/v1/csrf-token`,
  GET_CATEGORIES_ARTICLES: () => {
    const url = `https://content.guardianapis.com/sections?q=${sections.join()}&format=json&api-key=${
      import.meta.env.VITE_API_KEY
    }`;
    return url;
  },
  GET_ARTICLES: (category: string, page: string) => {
    const url = `https://content.guardianapis.com/${category}?show-fields=body,headline,trailText&show-elements=image&page=${page}&page-size=12&api-key=${
      import.meta.env.VITE_API_KEY
    }`;
    return url;
  },
  GET_DETAILS_ARTICLE: (id: string) => {
    const url = `https://content.guardianapis.com/${id}?show-fields=body,trailText&show-elements=image&api-key=${
      import.meta.env.VITE_API_KEY
    }`;
    return url;
  },
  GET_COMMENTS: (id: string, page: string) => {
    const url = `/api/v1/comments/${id}?page=${page}`;
    return url;
  },
  GET_COMMENT_REPLIES: (id: string, commentId: string, page: string) => {
    const url = `/api/v1/comments/${id}/${commentId}?page_reply=${page}`;
    return url;
  },
  CREATE_COMMENT: () => `/api/v1/comments/create`,
  UPDATE_COMMENT_LIKE: (id: string, commentId: string) => {
    const url = `/api/v1/comments/likes/${id}/${commentId}`;
    return url;
  },
};
