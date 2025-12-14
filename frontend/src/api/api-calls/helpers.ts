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

  if (!response.ok && response.status >= 500) {
    return {
      message: response.statusText || 'Server is in idle mode to save resources. Response may be delayed.',
      success: false,
    };
  }

  return await response.json();
};

export function setActionResponse<T = unknown>(action: string, result: APISuccessResponse<T> | APIErrorResponse) {
  return { action, ...result };
}
