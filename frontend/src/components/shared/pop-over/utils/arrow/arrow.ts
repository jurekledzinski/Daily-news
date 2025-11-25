import { Alignment, BasePlacement, Placement } from '../../types';

export const arrowFlip = (value: Placement) => {
  const [key, align] = value.split(' ') as [BasePlacement, Alignment?];

  const opposite: Record<BasePlacement, BasePlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const placement: Placement = align ? `${opposite[key]} ${align}` : opposite[key];

  return placement;
};
