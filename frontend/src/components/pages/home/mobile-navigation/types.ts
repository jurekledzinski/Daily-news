export type MobileNavigationProps = {
  isLoggedIn: boolean;
  navigateProfile: () => void;
  onLogout: () => void;
  onOpenModalSignIn: () => void;
  onOpenModalSignUp: () => void;
  userName?: string;
};
