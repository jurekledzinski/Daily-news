import { getLocalData } from '@/helpers';
import { LayoutData } from '@/components/pages';
import { useEffect } from 'react';
import { UseLoadGridProps } from './types';

export const useLoadGrid = ({ onSetLayout }: UseLoadGridProps) => {
  useEffect(() => {
    const localData = getLocalData();
    if (!localData.length) return;

    const transformedData = localData.reduce<LayoutData>((acc, curr) => {
      let tempAcc: LayoutData = {};

      Object.entries(curr.ui).forEach((item) => {
        tempAcc = {
          ...tempAcc,
          [item[0]]: [
            {
              id: curr.id ?? '',
              title: curr.title,
              ui: item[1],
              page: curr.page,
              image: curr.image,
            },
          ],
        };
      });

      if (Object.keys(acc).length && Object.keys(tempAcc).length) {
        const accData = Object.entries(acc).map((i) => {
          return [i[0], [...i[1], ...tempAcc[i[0]]]];
        });
        return (acc = Object.fromEntries(accData));
      } else {
        return (acc = tempAcc);
      }
    }, {});

    // setLayout(transformedData);
    onSetLayout(transformedData);
  }, [onSetLayout]);
};
