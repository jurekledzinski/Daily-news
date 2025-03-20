import { LayoutData, LocalData } from '@/components/pages';

export type UseLoadGridProps = {
  onSetLayout: (layout: LayoutData) => void;
};

export type UseSetLayout = {
  onSetLayout: (layout: LayoutData) => void;
  onSetLocalData: (layout: LocalData[]) => void;
};

export type UseControlDashboardProps = {
  currentBreakPoint: string;
  layoutData: LayoutData;
  onChangeBreakpoint: (breakpoint: string) => void;
  onDrop: (newLayouts: LayoutData) => void;
  onDropStop: (newLayouts: LayoutData) => void;
  onResizeStop: (newLayouts: LayoutData) => void;
  onRemoveCard: (newLayouts: LayoutData) => void;
};
