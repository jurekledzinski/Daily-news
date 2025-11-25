import { Placement } from '../../types';
import { VerticalCheckSpace } from './types';

export const checkVerticalSpace: VerticalCheckSpace = ({
  canPlaceTop,
  canPlaceBottom,
  mainDirection,
  currentPlacement,
  mainDefault,
  alignment,
}) => {
  const top = (alignment ? `top ${alignment}` : 'top') as Placement;
  const bottom = (alignment ? `bottom ${alignment}` : 'bottom') as Placement;

  if (!canPlaceTop && canPlaceBottom && mainDirection === 'top') {
    return bottom;
  }

  if (!canPlaceBottom && canPlaceTop && mainDirection === 'bottom') {
    return top;
  }

  if (currentPlacement !== mainDefault && mainDefault === 'top' && canPlaceTop) {
    return top;
  }

  if (currentPlacement !== mainDefault && mainDefault === 'bottom' && canPlaceBottom) {
    return bottom;
  }
};
