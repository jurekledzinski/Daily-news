import { APIErrorResponse, APISuccessResponse } from '../api';
import { queryClient as useQueryClient } from '@routes';

export const formatDataToObject = <T>(data: FormData) => {
  return Object.fromEntries(data.entries()) as T;
};

export const queryInvalidate = (queryKey: string[]) => {
  useQueryClient.invalidateQueries({
    queryKey,
  });
};

export const queryRemove = (queryKey: string[]) => {
  useQueryClient.removeQueries({
    queryKey,
  });
};

export const getMessageError = (message: string, action: string) => ({
  message,
  action,
});

export const validateAction = (
  result: Omit<APISuccessResponse<unknown>, 'payload'> | APIErrorResponse,
  action: string
) => {
  if (!result.success) return getMessageError(result.message!, action);
};
