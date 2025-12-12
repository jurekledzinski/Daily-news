import { HTMLAttributes, ReactEventHandler } from 'react';

export type Loading = 'skeleton' | 'loader';

type Params = {
  isError?: boolean;
  isLoading?: boolean;
  onError?: ReactEventHandler<HTMLImageElement>;
  onLoad?: ReactEventHandler<HTMLImageElement>;
};

export interface ImageContainerProps extends Omit<HTMLAttributes<HTMLImageElement>, 'children'> {
  loader: Loading;
  children?: (params: Params) => React.ReactNode;
}
