import { MouseEventHandler } from 'react';

export type DesktopNavigationProps = {
  isLoggedIn: boolean;
  navigateProfile: () => void;
  onLogout: MouseEventHandler<HTMLButtonElement>;
  onOpenModalSignIn: () => void;
  onOpenModalSignUp: () => void;
};
