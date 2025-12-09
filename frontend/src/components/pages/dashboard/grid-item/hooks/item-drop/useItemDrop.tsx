import { GridStackLayout } from '../../../grid-layout';
import { useEffect, useRef } from 'react';
import type { UseItemDropProps } from './types';

const dragInOptions = { w: 1, h: 2, maxW: 1, autoPosition: true };

export const useItemDrop = ({ item }: UseItemDropProps) => {
  const gridItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridItemRef.current) return;
    GridStackLayout.setupDragIn([gridItemRef.current], { handle: '.drag-grid-item', scroll: false }, [
      {
        id: item.id,
        content: JSON.stringify(item),
        ...dragInOptions,
      },
    ]);
  }, [item]);

  return gridItemRef;
};
