import { Placement } from '../../types';
import { ReturnPosition } from '../directions';

type ResolvePositionParams = {
  currentPlacement: Placement;
  panelRect: DOMRect;
  panelStyle: CSSStyleDeclaration;
  triggerRect: DOMRect;
  autoWidth?: boolean;
};

export type ResolvePosition = (params: ResolvePositionParams) => ReturnPosition;

type SetNewPositionParams = {
  autoWidth: boolean;
  gap: number;
  panelRef: React.RefObject<HTMLDivElement | null>;
  updatedPosition: ReturnPosition;
  mainDirection: string;
};

export type SetNewPosition = (params: SetNewPositionParams) => void;

export type ParsePlacement = (
  placement: Placement,
  dynamic?: Placement
) => {
  currentPlacement: Placement;
  mainDirection: string;
  alignment: string;
};
