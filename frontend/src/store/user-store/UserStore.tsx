import { ContextUser } from './context';
import { useMemo, useReducer } from 'react';
import { UserProviderProps, UserStoreContext } from './types';
import { userReducer } from './userReducer';

const initialState = { user: null };

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const values = useMemo<UserStoreContext>(() => ({ state, dispatch }), [state, dispatch]);

  return <ContextUser.Provider value={values}>{children}</ContextUser.Provider>;
};
