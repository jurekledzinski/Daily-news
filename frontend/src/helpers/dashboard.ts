import { LayoutData, LayoutItem } from '../types';

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

// for (let y = startY; y < 100; y++) {

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
