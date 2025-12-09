import { queryClient } from '@routes';

export const formatDataToObject = <T>(data: FormData) => {
  return Object.fromEntries(data.entries()) as T;
};

export const queryInvalidate = (queryKey: string[]) => {
  queryClient.invalidateQueries({ queryKey });
};
