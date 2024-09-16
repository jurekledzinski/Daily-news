import type ReactGridLayout from 'react-grid-layout';
import { LayoutData } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { findPosition } from '../helpers';

export const colsLayouts = {
  lg: 4,
  md: 3,
  sm: 2,
  xs: 1,
};

type useControlDashboardProps = {
  currentBreakPoint: string;
  data: LayoutData;
  onChangeBreakpoint: (breakpoint: string) => void;
  onDrop: (newLayouts: LayoutData) => void;
  onDropStop: (newLayouts: LayoutData) => void;
  onResizeStop: (newLayouts: LayoutData) => void;
};

export const useControlDashboard = ({
  currentBreakPoint,
  data,
  onChangeBreakpoint,
  onDrop,
  onDropStop,
  onResizeStop,
}: useControlDashboardProps) => {
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

    const item = {
      ...cloneDeep(newItem),
      i: newId,
    };

    const newLayouts = cloneDeep(data);

    const startY = item.y;

    const copyLayout = cloneDeep(layout).map((item) => {
      if (item.i === tempId) {
        return { ...tranformedData, ui: { ...item, i: newId } };
      }

      const prevItem = newLayouts[currentBreakPoint].find(
        (el) => el.ui.i === item.i
      );

      return {
        id: prevItem?.id ?? '',
        title: prevItem?.title ?? '',
        ui: { ...item },
      };
    });

    for (const breakpoint in data) {
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
    const copyData = cloneDeep(data);

    const updateData = {
      ...copyData,
      [currentBreakPoint]: copyData[currentBreakPoint].map((item) => {
        const sameItem = layout.find((el) => el.i === item.ui.i);

        if (sameItem) {
          return { id: item.id, ui: sameItem, title: item.title };
        }

        return item;
      }),
    };

    onDropStop(updateData);
  };

  const handleResizeStop = (layout: ReactGridLayout.Layout[]) => {
    const copyData = cloneDeep(data);

    const updateData = {
      ...copyData,
      [currentBreakPoint]: copyData[currentBreakPoint].map((item) => {
        const sameItem = layout.find((el) => el.i === item.ui.i);

        if (sameItem) {
          return { id: item.id, ui: sameItem, title: item.title };
        }

        return item;
      }),
    };

    onResizeStop(updateData);
  };

  return {
    handleBreakPointChange,
    handleDrop,
    handleDropStop,
    handleResizeStop,
  };
};
