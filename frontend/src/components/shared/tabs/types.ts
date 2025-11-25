import { Color, Size, Variant } from '@types';

export type TabsProps = {
  children?: React.ReactNode;
  defaultSelectedKey?: string;
  onSelectChange?: (key: string) => void;
  selectedKey?: string;
  color?: Color;
  size?: Size;
  variant?: Variant;
};
