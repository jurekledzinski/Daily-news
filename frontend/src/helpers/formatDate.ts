export const formatDateLocalString = ({
  date,
  locales = 'en-GB',
  options = { timeZone: 'UTC' },
}: {
  date?: string | Date;
  locales?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
}) => {
  if (!date) return 'Invalid date';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat(locales, options).format(parsedDate);
};

// Monday, 29/09/2025, 17:09:20
export const optionsFormatDate1: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};
