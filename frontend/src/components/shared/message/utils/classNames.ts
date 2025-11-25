import styles from '../Message.module.css';
import { generateClassNames } from '@helpers';
import { MessageProps } from '../types';

export const messageClassNames = (color: MessageProps['color']) => {
  return generateClassNames(styles, {
    message: true,
    [`${color}`]: Boolean(color),
  });
};
