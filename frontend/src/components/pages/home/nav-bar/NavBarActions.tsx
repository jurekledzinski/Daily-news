import { NavBarActionsProps } from './types';
import { useMatch } from 'react-router-dom';

export const NavBarActions = ({
  onBack,
  onClick,
  user,
}: NavBarActionsProps) => {
  const match = useMatch('/');

  return (
    <div className="header__actions">
      {!match && (
        <button className="header__button-back" onClick={onBack}>
          Back
        </button>
      )}
      {user && (
        <button className="header__profile" onClick={onClick}>
          Profile
        </button>
      )}
    </div>
  );
};
