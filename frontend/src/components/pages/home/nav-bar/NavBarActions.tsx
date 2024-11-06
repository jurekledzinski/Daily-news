import { NavBarActionsProps } from './types';
import { useMatch } from 'react-router-dom';

export const NavBarActions = ({
  isLoggedInUser,
  onBack,
  onClick,
}: NavBarActionsProps) => {
  const match = useMatch('/');

  return (
    <div className="header__actions">
      {!match && (
        <button className="header__button-back" onClick={onBack}>
          Back
        </button>
      )}
      {isLoggedInUser && (
        <button className="header__profile" onClick={onClick}>
          Profile
        </button>
      )}
    </div>
  );
};
