import { GridItemLayout } from '../../../grid-item-layout';
import { GridStackLayout } from '../../GridLayout';
import { GridStackNode } from 'gridstack';
import { UseGridInitializeProps } from './types';
import { useLayoutEffect, useState } from 'react';

import {
  getLocalItems,
  loadItems,
  setLocalItems,
  initialOptions,
  removeGridItems,
  setGridItemLayout,
} from '../../utils';

export const useGridInitialize = ({ navigateArticles }: UseGridInitializeProps) => {
  const [gridItemIds, setGridItemIds] = useState<string[]>(() =>
    getLocalItems().map((item) => item.id!)
  );

  useLayoutEffect(() => {
    const grid = GridStackLayout.init(initialOptions);

    const commonChangeAndDropped = () => {
      const itemsIds = grid.engine.nodes.map((item) => item.id!);
      setGridItemIds(itemsIds);
      setLocalItems(grid.engine.nodes);
    };

    const commonInitLoadAndDropped = (node: GridStackNode) => {
      const data = setGridItemLayout(node);
      if (!data) return;
      data.root.render(
        <GridItemLayout
          data={data.content ?? ''}
          navigateArticles={navigateArticles}
          onRemoveGridItem={() => grid.removeWidget(data.domNode)}
        />
      );
    };

    grid.on('change', () => commonChangeAndDropped());

    grid.on('dropped', (...params) => {
      commonChangeAndDropped();
      commonInitLoadAndDropped(params[2]);
    });

    grid.on('removed', (_, removedItems) => {
      const restItemsIds = removeGridItems(removedItems);
      setGridItemIds(restItemsIds);
    });

    loadItems(grid).forEach((item) => commonInitLoadAndDropped(item));

    return () => {
      grid.off('change');
      grid.off('dropped');
      grid.off('removed');
    };
  }, [navigateArticles]);

  return { gridItemIds };
};
