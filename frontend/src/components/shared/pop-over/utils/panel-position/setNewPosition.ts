import { SetNewPosition } from './types';

export const setNewPosition: SetNewPosition = ({
  autoWidth,
  panelRef,
  updatedPosition,
  mainDirection,
  gap,
}) => {
  if (panelRef.current) {
    panelRef.current.style.left = `${updatedPosition.x}px`;
    panelRef.current.style.top = `${updatedPosition.y}px`;
    if (mainDirection === 'bottom') {
      panelRef.current.style.transform = `translateY(${gap}px)`;
    }

    if (mainDirection === 'top') {
      panelRef.current.style.transform = `translateY(-${gap}px)`;
    }

    if (mainDirection === 'left') {
      panelRef.current.style.transform = `translateX(-${gap}px)`;
    }

    if (mainDirection === 'right') {
      panelRef.current.style.transform = `translateX(${gap}px)`;
    }

    if (autoWidth) panelRef.current.style.width = `${updatedPosition.w}px`;
  }
};
