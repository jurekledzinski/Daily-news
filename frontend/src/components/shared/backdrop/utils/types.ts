import { CSSProperties } from 'react';

type Params = {
  duration?: number;
  zIndex?: number;
};

export type BackdropCSSVariables = (params: Params) => CSSProperties;
