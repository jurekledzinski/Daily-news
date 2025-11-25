import styles from '../GridItem.module.css';
import { classNames, generateClassNames } from '@helpers';
import type { GridItemClassNames } from './types';

export const gridItemClassNames: GridItemClassNames = (params) => {
  const { gridItemIds, id } = params;

  return {
    gridItem: classNames(
      generateClassNames(styles, {
        gridItem: true,
        disabled: gridItemIds.includes(id),
        [id]: Boolean(id),
      }),
      'grid-stack-item'
    ),
    icon: styles.icon,
    image: styles.image,
    title: styles.title,
    text: styles.text,
  };
};
