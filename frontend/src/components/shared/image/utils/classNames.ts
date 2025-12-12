import styles from '../components/image-container/ImageContainer.module.css';
import stylesImage from '../Image.module.css';
import { classNames, generateClassNames } from '@helpers';
import { ImageClassNames, ImageContainerClassNames } from './types';

export const imageContainerClassNames: ImageContainerClassNames = (params) => {
  const { className, isLoading, loader } = params;

  return classNames(
    generateClassNames(styles, {
      ['image-wrapper']: true,
    }),
    className ?? '',
    isLoading && loader === 'skeleton' ? 'skeleton' : '',
    isLoading && loader === 'skeleton' ? 'wave' : ''
  );
};

export const imageClassNames: ImageClassNames = (className) => {
  return classNames(className, stylesImage.image);
};
