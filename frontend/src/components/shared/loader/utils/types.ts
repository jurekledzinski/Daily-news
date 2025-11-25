import { LoaderProps } from '../types';

type PickLoaderKeys = 'border' | 'position' | 'size';
type PickLoaderInlineKeys = 'colorTrack' | 'colorSpin' | 'size' | 'style';

interface LoaderParams extends Pick<LoaderProps, PickLoaderKeys> {
  className?: string;
}

type LoaderInlineParams = Pick<LoaderProps, PickLoaderInlineKeys>;

export type LoaderClassNames = (params: LoaderParams) => string | undefined;

export type LoaderInlineStyles = (params: LoaderInlineParams) => React.CSSProperties;
