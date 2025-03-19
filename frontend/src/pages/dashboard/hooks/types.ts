import { LayoutData, LocalData } from '@/components/pages';

export type UseLoadGridProps = {
  onSetLayout: (layout: LayoutData) => void;
};

export type UseSetLayout = {
  onSetLayout: (layout: LayoutData) => void;
  onSetLocalData: (layout: LocalData[]) => void;
};
