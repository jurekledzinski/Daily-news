import { Comment } from '@models';
import { formatDateLocalString, optionsFormatDate1 } from '@helpers';
import { useMemo } from 'react';

export const useFormatComments = (data: Comment[]) => {
  return useMemo(
    () =>
      data.map((comment) => {
        const { createdAt, id, text, user } = comment;
        const formattedDate = formatDateLocalString({
          date: createdAt,
          options: optionsFormatDate1,
        });
        return { createdAt: formattedDate, id, text, user };
      }),
    [data]
  );
};
