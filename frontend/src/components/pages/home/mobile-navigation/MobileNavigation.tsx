import styles from './MobileNavigation.module.css';
import { Button, Menu, MenuItem, MenuTrigger } from '@components/shared';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MobileNavigationProps } from './types';

export const MobileNavigation = ({
  isLoggedIn,
  navigateProfile,
  onLogout,
  onOpenModalSignIn,
  onOpenModalSignUp,
}: MobileNavigationProps) => {
  return (
    <MenuTrigger>
      <Button
        className={styles.button}
        color="info"
        iconEnd={[faBars]}
        label="Menu"
        size="size-xs"
      />
      <Menu className={styles.menu} size="size-xs">
        {isLoggedIn && (
          <MenuItem id="profile" onClick={navigateProfile}>
            Profile
          </MenuItem>
        )}
        {isLoggedIn && (
          <MenuItem id="logout" onClick={onLogout}>
            Logout
          </MenuItem>
        )}
        {!isLoggedIn && (
          <MenuItem id="sign in" onClick={onOpenModalSignIn}>
            Sign In
          </MenuItem>
        )}
        {!isLoggedIn && (
          <MenuItem id="sign up" onClick={onOpenModalSignUp}>
            Sign Up
          </MenuItem>
        )}
      </Menu>
    </MenuTrigger>
  );
};
