import { AvailablePlacements } from './types';

export const getAvailablePlacements: AvailablePlacements = ({
  autoWidth,
  gap,
  panelRect,
  triggerRect,
  viewportSize,
}) => {
  const panelWidth = autoWidth ? triggerRect.width : panelRect.width;

  const panelRightEdgeIfOnRight = triggerRect.right + panelWidth + 2 * gap;
  const panelLeftEdgeIfOnLeft = triggerRect.left - panelWidth - 2 * gap;

  const canPlaceRight = panelRightEdgeIfOnRight <= viewportSize.width;
  const canPlaceLeft = panelLeftEdgeIfOnLeft >= 0;

  const panelBottomEdge = triggerRect.bottom + gap;
  const panelTopEdge = triggerRect.y - gap;

  const canPlaceTop = panelTopEdge > panelRect.height;
  const canPlaceBottom = viewportSize.height - panelBottomEdge > panelRect.height;

  return { canPlaceRight, canPlaceLeft, canPlaceTop, canPlaceBottom };
};
