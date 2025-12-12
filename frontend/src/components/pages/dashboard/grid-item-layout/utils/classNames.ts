import styles from '../GridItemLayout.module.css';
import { classNames, generateClassNames } from '@helpers';
import { GridItemLayoutClassNames } from './types';

export const gridItemLayoutClassNames: GridItemLayoutClassNames = ({ id }) => {
  return {
    gridItemLayout: generateClassNames(styles, {
      container: true,
      [id]: !!id,
    }),
    header: styles.header,
    title: styles.title,
    subTitle: styles.subTitle,
    removeButton: classNames(styles.removeButton, 'removeButton'),
    footer: styles.footer,
    redirectButton: styles.button,
    gripHandle: classNames('grip-handle', styles.grip),
  };
};
