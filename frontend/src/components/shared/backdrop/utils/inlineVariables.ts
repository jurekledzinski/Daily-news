import { BackdropCSSVariables } from './types';

export const backdropCSSVariables: BackdropCSSVariables = (params) => {
  const { duration, zIndex } = params;

  return {
    ...(duration ? { '--animation-duration': `${duration}ms` } : {}),
    ...(zIndex ? { '--z-backdrop': zIndex } : {}),
  } as React.CSSProperties;
};
