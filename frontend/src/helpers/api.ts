import { APIErrorResponse, APISuccessResponse } from '@api/index';
import { RedirectFunction } from 'react-router-dom';
import { removeCookie, setCookie } from './global';
import type { QueryClient } from '@tanstack/react-query';

export const invalidateQueries = async (
  queryClient: QueryClient,
  queryKey: string[]
) => {
  await queryClient.invalidateQueries({
    queryKey,
  });
};

export const refetchQueries = async (
  queryClient: QueryClient,
  queryKey: string[]
) => {
  await queryClient.refetchQueries({
    queryKey,
  });
};

export const tryCatch = <T, K, N = unknown>(
  fn: (body: N) => Promise<T>
): ((body: N) => Promise<T | K>) => {
  return async (body: N): Promise<T | K> => {
    try {
      return await fn(body);
    } catch (error) {
      return error as K;
    }
  };
};

export const fetchOrCache = async <T>(
  queryClient: QueryClient,
  queryKey: string[],
  queryFn: () => Promise<T>
) => {
  return (queryClient.getQueryData(queryKey) as T) ?? (await queryFn());
};

export function setResponse(
  action: string,
  redirect: RedirectFunction,
  result: APISuccessResponse<unknown> | APIErrorResponse,
  url: string
) {
  if ('message' in result && !result.success) {
    const error = { message: result.message, action };
    setCookie('serverError', error);
    return redirect(url);
  }

  removeCookie('serverError');
  return redirect(url);
}

export function getUrlQuery(
  request: Request,
  nameQuery: string,
  initial: string
) {
  const url = new URL(request.url);
  return url.searchParams.get(nameQuery) ?? initial;
}
