import { cloneDeep } from 'lodash';
import { findPosition } from '@/helpers/index';
import { LayoutData } from '@/components/pages';
import { v4 as uuidv4 } from 'uuid';
import type ReactGridLayout from 'react-grid-layout';
import { UseControlDashboardProps } from './types';

export const colsLayouts = {
  lg: 4,
  md: 3,
  sm: 2,
  xs: 1,
};

export const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 500 };

export const useControlDashboard = ({
  currentBreakPoint,
  layoutData,
  onChangeBreakpoint,
  onDrop,
  onDropStop,
  onResizeStop,
  onRemoveCard,
}: UseControlDashboardProps) => {
  const handleBreakPointChange = (newBreakpoint: string) => {
    onChangeBreakpoint(newBreakpoint);
  };

  const handleDrop = (
    layout: ReactGridLayout.Layout[],
    newItem: ReactGridLayout.Layout,
    e: DragEvent
  ) => {
    const dataTransfer = e.dataTransfer?.getData('text/plain') ?? '';
    const tranformedData = JSON.parse(dataTransfer);
    const tempId = '__dropping-elem__';
    const newId = uuidv4();
    const isValidLayout = layout.some((item) => item.i === tempId);

    if (!isValidLayout) return;

    const item = {
      ...cloneDeep(newItem),
      i: newId,
    };

    const newLayouts = cloneDeep(layoutData);

    const startY = item.y;

    const copyLayout = cloneDeep(layout).map((item) => {
      if (item.i === tempId) {
        return { ...tranformedData, ui: { ...item, i: newId } };
      }

      const prevItem = newLayouts[currentBreakPoint].find(
        (el) => el.ui.i === item.i
      );

      if (prevItem) {
        return {
          id: prevItem.id,
          title: prevItem.title,
          ui: { ...item },
          image: prevItem.image,
        };
      }

      return item;
    });

    for (const breakpoint in layoutData) {
      if (breakpoint === currentBreakPoint) {
        newLayouts[breakpoint] = copyLayout;
      } else {
        const position = findPosition({
          data: newLayouts[breakpoint],
          cols: colsLayouts[breakpoint as keyof typeof colsLayouts],
          item,
          startY,
        });

        if (position) {
          item.x = position.x;
          item.y = position.y;
          newLayouts[breakpoint] = [
            ...newLayouts[breakpoint],
            { ...tranformedData, ui: { ...item } },
          ];
        }
      }
    }

    onDrop(newLayouts);
  };

  const handleDropStop = (layout: ReactGridLayout.Layout[]) => {
    const copyData = cloneDeep(layoutData);

    const updateData = {
      ...copyData,
      [currentBreakPoint]: copyData[currentBreakPoint].map((item) => {
        const sameItem = layout.find((el) => el.i === item.ui.i);

        if (sameItem) {
          return {
            id: item.id,
            ui: sameItem,
            title: item.title,
            image: item.image,
            page: item.page,
          };
        }

        return item;
      }),
    } as LayoutData;

    onDropStop(updateData);
  };

  const handleResizeStop = (layout: ReactGridLayout.Layout[]) => {
    const copyData = cloneDeep(layoutData);

    const updateData = {
      ...copyData,
      [currentBreakPoint]: copyData[currentBreakPoint].map((item) => {
        const sameItem = layout.find((el) => el.i === item.ui.i);

        if (sameItem) {
          return {
            id: item.id,
            ui: sameItem,
            title: item.title,
            image: item.image,
            page: item.page,
          };
        }

        return item;
      }),
    } as LayoutData;

    onResizeStop(updateData);
  };

  const handleRemoveCard = (id: string) => {
    const result = Object.entries(layoutData).map((layout) => {
      return [layout[0], layout[1].filter((item) => item.id !== id)];
    });

    const updatedLayout = Object.fromEntries(result) as LayoutData;

    onRemoveCard(updatedLayout);
  };

  return {
    handleBreakPointChange,
    handleDrop,
    handleDropStop,
    handleResizeStop,
    handleRemoveCard,
  };
};
