import { APIErrorResponse, APISuccessResponse } from '../api';
import { FetchAPIParameters } from './types';

export const fetchApi = async ({
  url,
  method = 'GET',
  mode,
  body,
  csrfToken,
  credentials,
}: FetchAPIParameters) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (csrfToken) headers['X-CSRF-Token' as keyof typeof headers] = csrfToken;

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) options['body'] = body;
  if (mode) options['mode'] = mode;
  if (credentials) options['credentials'] = credentials;

  const response = await fetch(url, options);

  return await response.json();
};

export function setActionResponse<T = unknown>(action: string, result: APISuccessResponse<T> | APIErrorResponse) {
  return { action, ...result };
}
