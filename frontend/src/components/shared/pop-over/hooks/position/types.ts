import { Placement } from '../../types';

export type ViewportSize = {
  height: number;
  width: number;
};

export type UsePositionProps = {
  getTriggerRect: () => DOMRect | undefined;
  open: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  updateTriggerRect: () => void;
  autoWidth?: boolean;
  gap?: number;
  placement?: Placement;
};
