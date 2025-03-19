export const formatSearchQuery = (
  searchParams: URLSearchParams,
  queries: string[][]
) => {
  const updatedParams = new URLSearchParams(searchParams);
  const objectEntries = Object.fromEntries(queries);

  for (const key in objectEntries) {
    updatedParams.set(key, objectEntries[key]);
  }

  return updatedParams.toString();
};
