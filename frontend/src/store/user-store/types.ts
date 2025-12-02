import { Dispatch } from 'react';

export type User = {
  email: string;
  name: string;
  id?: string;
};

export type UserState = {
  user: User | null;
};

export type UserAction = { type: 'SET_USER'; payload: User | null } | { type: 'LOGOUT_USER' };

export type UserStoreContext = {
  state: UserState;
  dispatch: Dispatch<UserAction>;
};

export type UserProviderProps = {
  children: React.ReactNode;
};
