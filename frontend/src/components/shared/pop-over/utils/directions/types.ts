type Parameters = {
  alignment: string;
  autoWidth?: boolean;
  heightWindow: number;
  panelRect: DOMRect;
  widthWindow: number;
  triggerRect: DOMRect;
  panelStyle: CSSStyleDeclaration;
};

export type ReturnPosition = { x: number; y: number; w: number };

export type SetBottom = (
  params: Omit<Parameters, 'heightWindow' | 'panelStyle' | 'widthWindow'>
) => ReturnPosition;

export type SetTop = (
  params: Omit<Parameters, 'heightWindow' | 'panelStyle' | 'widthWindow'>
) => ReturnPosition;

export type SetLeft = (params: Omit<Parameters, 'heightWindow' | 'widthWindow'>) => ReturnPosition;

export type SetRight = (params: Omit<Parameters, 'heightWindow' | 'widthWindow'>) => ReturnPosition;
