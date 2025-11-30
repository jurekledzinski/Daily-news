import styles from './MobileNavigation.module.css';
import { Button, Menu, MenuItem, MenuTrigger } from '@components/shared';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MobileNavigationProps } from './types';

export const MobileNavigation = ({ navigateProfile, onLogout }: MobileNavigationProps) => {
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
        <MenuItem id="profile" onClick={navigateProfile}>
          Profile
        </MenuItem>
        <MenuItem id="logout" onClick={onLogout}>
          Logout
        </MenuItem>
        <MenuItem id="sign in">Sign In</MenuItem>
        <MenuItem id="sign up">Sign Up</MenuItem>
      </Menu>
    </MenuTrigger>
  );
};
