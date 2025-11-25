import { Loading } from '../components';

type ParamsContainer = {
  isLoading: boolean;
  className?: string;
  loader?: Loading;
};

export type ImageContainerClassNames = (params: ParamsContainer) => string | undefined;

export type ImageClassNames = (className?: string) => string | undefined;
