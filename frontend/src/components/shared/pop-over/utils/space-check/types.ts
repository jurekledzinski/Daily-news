import { ViewportSize } from '../../hooks';
import { Placement } from '../../types';

type CommoneCheckSpace = {
  alignment: string;
  canPlaceBottom: boolean;
  canPlaceLeft: boolean;
  canPlaceRight: boolean;
  canPlaceTop: boolean;
  currentPlacement: Placement;
  mainDefault: string;
  mainDirection: string;
};

type VerticalKeys = 'canPlaceTop' | 'canPlaceBottom';
type HorizontalKeys = 'canPlaceRight' | 'canPlaceLeft';
type HorizontalParams = Omit<CommoneCheckSpace, VerticalKeys>;
type VerticalParams = Omit<CommoneCheckSpace, HorizontalKeys>;

export type HorizontalCheckSpace = (params: HorizontalParams) => Placement | undefined;
export type VerticalCheckSpace = (params: VerticalParams) => Placement | undefined;

type PlacementsParmas = {
  autoWidth: boolean;
  gap: number;
  panelRect: DOMRect;
  triggerRect: DOMRect;
  viewportSize: ViewportSize;
};

export type AvailablePlacements = (params: PlacementsParmas) => {
  canPlaceRight: boolean;
  canPlaceLeft: boolean;
  canPlaceTop: boolean;
  canPlaceBottom: boolean;
};
