import { MouseEventHandler } from 'react';

export type NavActionsProps = {
  isLoggedIn: boolean;
  onBack: () => void;
  onNavigateProfile: () => void;
};

export type NavAuthProps = {
  isLoggedIn: boolean;
  onLogout: MouseEventHandler<HTMLButtonElement>;
};
