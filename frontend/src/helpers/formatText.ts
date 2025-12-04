export const capitalizeFirstLetter = (text?: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const defaultErrorMessage = (action: string) =>
  `${capitalizeFirstLetter(action)} failed. Please try again later.`;
