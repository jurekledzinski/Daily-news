import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Border = 'border-xs' | 'border-sm' | 'border-md' | 'border-lg' | 'border-xl';

export type Radius = 'radius-xs' | 'radius-sm' | 'radius-md' | 'radius-lg' | 'radius-xl';

export type Size = 'size-xxs' | 'size-xs' | 'size-sm' | 'size-md' | 'size-lg';

export type Color = 'info' | 'primary' | 'secondary' | 'success' | 'negative' | 'warning' | 'white';

export type Variant = 'contained' | 'outlined' | 'text';
export type InputVariant = 'basic' | 'contained' | 'outlined' | 'underline';

export type Icons = IconProp[];
export type Icon = IconProp;

export type Orientation = 'row' | 'column';

export type Spacing = 'none' | 'tight' | 'normal' | 'loose' | 'extra-loose';

export type Justify =
  | 'justify-end'
  | 'justify-start'
  | 'justify-center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export type Aligment = 'aligment-center' | 'aligment-end' | 'aligment-start' | 'stretch';
