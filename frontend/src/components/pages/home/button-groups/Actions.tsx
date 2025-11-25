import { Button, ButtonGroup } from '@components/shared';
import { faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavActionsProps } from './types';
import { useMatch } from 'react-router';

export const NavActions = ({ isLoggedIn, onBack, onNavigateProfile }: NavActionsProps) => {
  const match = useMatch('/');

  return (
    <ButtonGroup spacing="normal">
      {!match && (
        <Button
          className="r-xs"
          color="info"
          label="Back"
          iconStart={[faChevronLeft]}
          onClick={onBack}
          size="size-xs"
          type="button"
          variant="outlined"
        />
      )}
      {isLoggedIn && (
        <Button
          className="r-xs"
          color="info"
          label="Profile"
          iconEnd={[faUser]}
          onClick={onNavigateProfile}
          size="size-xs"
          type="button"
        />
      )}
    </ButtonGroup>
  );
};
