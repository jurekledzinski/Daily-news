import styles from './CarouselThumbnails.module.css';
import { carouselOptions } from './constants';
import { GroupThumbnailsProps } from './types';
import { Splide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export const CarouselThumbnails = ({ children }: GroupThumbnailsProps) => {
  return (
    <div className={styles.container}>
      <Splide aria-label="Advert images" className={styles.splide} options={carouselOptions}>
        {children}
      </Splide>
    </div>
  );
};
