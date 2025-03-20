import { Categories } from '@/api';
import { cloneDeep } from 'lodash';
import { colsLayouts } from '@/pages/dashboard';
import { LayoutData, LayoutItem } from '@/components/pages';
import { v4 as uuidv4 } from 'uuid';

type fnFindPositionParams = {
  data: LayoutData[0];
  cols: number;
  item: LayoutItem['ui'];
  startY: number;
};

type fnCanPlaceItemParams = {
  layout: LayoutData[0];
  x: number;
  y: number;
  w: number;
  h: number;
};

export const canPlaceItem = (params: fnCanPlaceItemParams) => {
  const { layout, h, w, x, y } = params;

  for (let i = 0; i < layout.length; i++) {
    const l = layout[i];
    if (
      x < l.ui.x + l.ui.w &&
      x + w > l.ui.x &&
      y < l.ui.y + l.ui.h &&
      y + h > l.ui.y
    ) {
      return false;
    }
  }
  return true;
};

export const findPosition = (params: fnFindPositionParams) => {
  const { cols, data, item } = params;

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < cols; x++) {
      if (canPlaceItem({ layout: data, x, y, w: item.w, h: item.h })) {
        return { x, y };
      }
    }
  }
  return null;
};

export function handleAddCardOnTouch(
  data: Categories,
  layout: LayoutData,
  onSetLayout: (newLayout: LayoutData) => void
) {
  const newItem = {
    page: '1',
    title: data.title,
    id: data.id,
    ui: {
      i: uuidv4(),
      x: 0,
      y: 0,
      h: 4,
      w: 1,
      minH: 4,
      maxH: 8,
      minW: 1,
      maxW: 2,
    },
  };

  const startY = newItem.ui.y;

  const newLayouts = cloneDeep(layout);

  for (const breakpoint in layout) {
    const position = findPosition({
      data: newLayouts[breakpoint],
      cols: colsLayouts[breakpoint as keyof typeof colsLayouts],
      item: newItem.ui,
      startY,
    });

    if (position) {
      newItem.ui.x = position.x;
      newItem.ui.y = position.y;
      newLayouts[breakpoint] = [
        ...newLayouts[breakpoint],
        { page: '1', ...data, ui: { ...newItem.ui } },
      ];
    }

    onSetLayout(newLayouts);
  }
}
