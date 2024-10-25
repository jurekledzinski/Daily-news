import { ContextUser } from './UserStore';
import { useContext } from 'react';

export const useUserStore = () => {
  const context = useContext(ContextUser);

  if (!context) {
    throw new Error("User context isn't in the user provider");
  }

  return context;
};
