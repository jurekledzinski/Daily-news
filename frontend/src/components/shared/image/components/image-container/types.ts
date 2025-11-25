import { HTMLAttributes } from 'react';

export type Loading = 'skeleton' | 'loader';

type Params = {
  isError?: boolean;
  isLoading?: boolean;
  onLoad?: () => void;
  onError?: () => void;
};

export interface ImageContainerProps extends Omit<HTMLAttributes<HTMLImageElement>, 'children'> {
  loader: Loading;
  children?: (params: Params) => React.ReactNode;
}
