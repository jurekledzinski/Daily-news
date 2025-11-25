export const getNumericValue = (value: string, unit: string = 'px') => {
  if (value.endsWith(unit)) return parseFloat(value.replace(unit, ''));
  return parseFloat(value);
};
