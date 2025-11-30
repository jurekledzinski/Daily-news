import styles from './ActionsNavigation.module.css';
import { ActionsNavigationProps } from './types';
import { Button } from '@components/shared';
import { classNames } from '@/helpers';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useMatch } from 'react-router';

export const ActionsNavigation = ({ navigateBack }: ActionsNavigationProps) => {
  const match = useMatch('/');

  return (
    <>
      {!match && (
        <Button
          className={classNames(styles.button, 'r-xs')}
          color="info"
          label="Back"
          iconStart={[faChevronLeft]}
          onClick={navigateBack}
          size="size-xs"
          type="button"
          variant="outlined"
        />
      )}
    </>
  );
};
