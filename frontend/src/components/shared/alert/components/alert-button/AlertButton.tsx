import styles from '../../Alert.module.css';
import { AlertButtonProps } from './types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@components/shared';

export const AlertButton = ({ icon = faXmark, ...props }: AlertButtonProps) => {
  return (
    <span className={styles.iconClose}>
      <IconButton icon={[icon]} size="size-xxs" {...props} />
    </span>
  );
};
