import { ImgHTMLAttributes } from 'react';
import { Loading } from './components';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;
export type ImageWithLoaderProps = {
  src: string;
  loader: Loading;
};
