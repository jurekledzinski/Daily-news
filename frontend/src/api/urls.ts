export const URLS = {
  FETCH_USER: () => 'http://localhost:5000/api/v1/users',
  CREATE_USER: () => 'http://localhost:5000/api/v1/register',
  LOGIN_USER: () => 'http://localhost:5000/api/v1/login',
  LOGOUT_USER: () => 'http://localhost:5000/api/v1/users/logout',
  UPDATE_USER_PROFILE: (id: string) =>
    `http://localhost:5000/api/v1/users/update_profile/${id}`,
  CHANGE_USER_PASSWORD: (id: string) =>
    `http://localhost:5000/api/v1/users/change_password/${id}`,
  DELETE_USER_ACCOUNT: (id: string) =>
    `http://localhost:5000/api/v1/users/delete_user/${id}`,
  GET_CATEGORIES_ARTICLES: () => {
    return `https://content.guardianapis.com/sections?&format=json&api-key=${
      import.meta.env.VITE_API_KEY
    }`;
  },
  GET_ARTICLES: (category: string, page: string) => {
    return `https://content.guardianapis.com/${category}?show-fields=body,headline,trailText&show-elements=image&page=${page}&page-size=12&api-key=${
      import.meta.env.VITE_API_KEY
    }`;
  },
  GET_DETAILS_ARTICLE: (id: string) => {
    return `https://content.guardianapis.com/${id}?show-fields=body,trailText&show-elements=image&api-key=${
      import.meta.env.VITE_API_KEY
    }`;
  },
  GET_COMMENTS: (id: string, page: string) => {
    return `http://localhost:5000/api/v1/comments/${id}?page=${page}`;
  },
  GET_COMMENT_REPLIES: (id: string, commentId: string, page: string) => {
    return `http://localhost:5000/api/v1/comments/${id}/${commentId}?page_reply=${page}`;
  },
  CREATE_COMMENT: () => 'http://localhost:5000/api/v1/comments/create',
  UPDATE_COMMENT_LIKE: (id: string, commentId: string) => {
    return `http://localhost:5000/api/v1/comments/likes/${id}/${commentId}`;
  },
};
