import { queryClient } from '@routes';

export const formatDataToObject = <T>(data: FormData) => {
  return Object.fromEntries(data.entries()) as T;
};

export const queryInvalidate = (queryKey: string[]) => {
  queryClient.invalidateQueries({ queryKey });
};

export const queryRemove = (queryKey: string[]) => {
  queryClient.removeQueries({ queryKey });
};

export const getMessageError = (message: string, action: string) => ({
  message,
  action,
});
