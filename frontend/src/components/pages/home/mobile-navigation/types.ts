export type MobileNavigationProps = {
  isLoggedIn: boolean;
  navigateProfile: () => void;
  onOpenModalSignIn: () => void;
  onOpenModalSignUp: () => void;
  onLogout: () => void;
};
