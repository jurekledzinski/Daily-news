import { HorizontalCheckSpace } from './types';
import { Placement } from '../../types';

export const checkHorizontalSpace: HorizontalCheckSpace = ({
  canPlaceRight,
  canPlaceLeft,
  mainDirection,
  currentPlacement,
  mainDefault,
  alignment,
}) => {
  const left = (alignment ? `left ${alignment}` : 'left') as Placement;
  const right = (alignment ? `right ${alignment}` : 'right') as Placement;

  if (!canPlaceRight && canPlaceLeft && mainDirection === 'right') {
    return left;
  }

  if (!canPlaceLeft && canPlaceRight && mainDirection === 'left') {
    return right;
  }

  if (currentPlacement !== mainDefault && mainDefault === 'right' && canPlaceRight) {
    return right;
  }

  if (currentPlacement !== mainDefault && mainDefault === 'left' && canPlaceLeft) {
    return left;
  }
};
