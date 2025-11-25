import { ResolvePosition } from './types';
import { setBottom, setLeft, setRight, setTop } from '../directions';

export const resolvePosition: ResolvePosition = ({
  currentPlacement,
  panelRect,
  triggerRect,
  autoWidth,
  panelStyle,
}) => {
  const alignment = currentPlacement?.split(' ')[1];
  const mainDirection = currentPlacement?.split(' ')[0];

  switch (mainDirection) {
    case 'top':
      return setTop({
        alignment,
        autoWidth,
        panelRect,
        triggerRect,
      });

    case 'bottom': {
      return setBottom({
        alignment,
        autoWidth,
        panelRect,
        triggerRect,
      });
    }

    case 'left': {
      return setLeft({
        alignment,
        autoWidth,
        panelRect,
        panelStyle,
        triggerRect,
      });
    }

    case 'right': {
      return setRight({
        alignment,
        autoWidth,
        panelRect,
        panelStyle,
        triggerRect,
      });
    }

    default:
      return setBottom({
        alignment,
        autoWidth,
        panelRect,
        triggerRect,
      });
  }
};
