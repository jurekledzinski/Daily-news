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
