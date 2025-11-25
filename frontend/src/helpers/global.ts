import DOMPurify from 'dompurify';

export const sanitizeContent = (content: string) => DOMPurify.sanitize(content);

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');

  const cookieValue = cookies.find((row) => row.trim().startsWith(name))?.split('=')[1];

  if (cookieValue) {
    return JSON.parse(cookieValue);
  }

  return null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const setCookie = (name: string, data: unknown) => {
  document.cookie = `${name}=${JSON.stringify(data)}`;
};
