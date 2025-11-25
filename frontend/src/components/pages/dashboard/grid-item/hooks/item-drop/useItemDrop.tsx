import { GridStackLayout } from '../../../grid-layout';
import { useEffect, useRef } from 'react';
import type { UseItemDropProps } from './types';

export const useItemDrop = ({ item }: UseItemDropProps) => {
  const gridItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridItemRef.current) return;
    GridStackLayout.setupDragIn([gridItemRef.current], undefined, [
      {
        id: item.id,
        w: 1,
        h: 2,
        content: JSON.stringify(item),
        maxW: 1,
        autoPosition: true,
      },
    ]);
  }, [item]);

  return gridItemRef;
};
