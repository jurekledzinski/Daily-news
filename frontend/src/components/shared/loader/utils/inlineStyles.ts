import { LoaderInlineStyles } from './types';

export const loaderInlineStyles: LoaderInlineStyles = (params) => {
  const { colorSpin, colorTrack, size, style } = params;

  const borderColors =
    colorTrack || colorSpin
      ? {
          borderTopColor: colorSpin || colorTrack,
          borderRightColor: colorTrack,
          borderBottomColor: colorTrack,
          borderLeftColor: colorTrack,
        }
      : {};

  const resolvedSize =
    typeof size === 'number' ? { width: size, height: size, '--size': `${size}px` } : {};

  return {
    ...style,
    ...resolvedSize,
    ...borderColors,
  };
};
