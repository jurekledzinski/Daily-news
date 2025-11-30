import styles from './DesktopNavigation.module.css';
import { Button, ButtonGroup } from '@components/shared';
import { DesktopNavigationProps } from './types';
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export const DesktopNavigation = ({
  isLoggedIn,
  navigateProfile,
  onLogout,
  onOpenModalSignIn,
  onOpenModalSignUp,
}: DesktopNavigationProps) => {
  return (
    <ButtonGroup className={styles.buttonGroup} spacing="normal">
      {isLoggedIn && (
        <Button
          className="r-xs"
          color="info"
          label="Profile"
          iconEnd={[faUser]}
          onClick={navigateProfile}
          size="size-xs"
          type="button"
        />
      )}

      {isLoggedIn && (
        <Button
          className="r-xs"
          color="info"
          iconEnd={[faArrowRightFromBracket]}
          label="Logout"
          onClick={onLogout}
          size="size-xs"
          type="button"
        />
      )}

      {!isLoggedIn && (
        <Button
          className="r-xs"
          color="info"
          type="button"
          iconEnd={[faArrowLeft]}
          label="Sign In"
          onClick={onOpenModalSignIn}
          size="size-xs"
        />
      )}

      {!isLoggedIn && (
        <Button
          className="r-xs"
          color="info"
          type="button"
          iconEnd={[faUserPlus]}
          label="Sign Up"
          onClick={onOpenModalSignUp}
          size="size-xs"
        />
      )}
    </ButtonGroup>
  );
};
