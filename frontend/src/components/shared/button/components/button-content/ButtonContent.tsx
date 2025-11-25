import styles from '../../styles/Button.module.css';
import { ButtonContentProps } from './types';
import { Icon, Loader } from '@/components/shared';

export const ButtonContent = ({
  isLoading,
  iconEnd,
  iconStart,
  size,
  label,
}: ButtonContentProps) => {
  return (
    <>
      {isLoading && iconStart && !iconEnd ? (
        <span className={styles.iconStart}>
          <Loader size={size} position="element" />
        </span>
      ) : (
        iconStart && (
          <span className={styles.iconStart}>
            <Icon icon={iconStart[0]} size="1x" />
          </span>
        )
      )}

      {isLoading && !iconStart && !iconEnd ? (
        <>
          <span className={styles.iconCenter}>
            <Loader size={size} />
          </span>
          <span className={styles.label}>{label}</span>
        </>
      ) : (
        <span className={styles.label}>{label}</span>
      )}

      {isLoading && iconEnd ? (
        <span className={styles.iconEnd}>
          <Loader size={size} position="element" />
        </span>
      ) : (
        iconEnd && (
          <span className={styles.iconEnd}>
            <Icon icon={iconEnd[0]} size="1x" />
          </span>
        )
      )}
    </>
  );
};
