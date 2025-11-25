import { Placement } from '../../types';
import { useCallback } from 'react';
import { UsePositionProps, ViewportSize } from './types';
import { useWindowResize, useWindowScroll } from '@hooks';
import {
  checkHorizontalSpace,
  checkVerticalSpace,
  getAvailablePlacements,
  parsePlacement,
  setNewPosition,
  resolvePosition,
} from '../../utils';

export const usePosition = ({
  autoWidth = false,
  gap = 8,
  panelRef,
  placement = 'bottom',
  open,
  getTriggerRect,
  updateTriggerRect,
}: UsePositionProps) => {
  const onSetPosition = useCallback(
    (dynamic?: Placement, windowSize?: ViewportSize, triggerRect?: DOMRect) => {
      if (!panelRef.current || !triggerRect) return;

      const viewportSize = {
        width: windowSize?.width ?? window.innerWidth,
        height: windowSize?.height ?? window.innerHeight,
      };

      const panelDirection = parsePlacement(placement, dynamic);
      const panelStyle = window.getComputedStyle(panelRef.current);
      const panelRect = panelRef.current.getBoundingClientRect();

      const canPlace = getAvailablePlacements({
        autoWidth,
        panelRect,
        triggerRect,
        gap,
        viewportSize,
      });

      const updatedPosition = resolvePosition({
        autoWidth,
        panelRect,
        panelStyle,
        triggerRect,
        ...panelDirection,
      });

      const horiontalFlip = checkHorizontalSpace({
        mainDefault: placement,
        ...canPlace,
        ...panelDirection,
      });

      if (horiontalFlip) return onSetPosition(horiontalFlip, viewportSize, triggerRect);

      const verticalFlip = checkVerticalSpace({
        mainDefault: placement,
        ...canPlace,
        ...panelDirection,
      });

      if (verticalFlip) return onSetPosition(verticalFlip, viewportSize, triggerRect);

      setNewPosition({
        autoWidth,
        gap,
        panelRef,
        updatedPosition,
        ...panelDirection,
      });
    },
    [autoWidth, gap, panelRef, placement]
  );

  useWindowResize({
    onResize: useCallback(() => {
      if (open) {
        updateTriggerRect();
        const rect = getTriggerRect();
        const size = { height: window.innerHeight, width: window.innerWidth };
        onSetPosition(placement, size, rect);
      } else {
        updateTriggerRect();
      }
    }, [getTriggerRect, open, onSetPosition, placement, updateTriggerRect]),
  });

  useWindowScroll({
    onScroll: () => updateTriggerRect(),
  });

  return { onSetPosition };
};
