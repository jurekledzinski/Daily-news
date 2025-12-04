import { Dispatch } from 'react';

export type User = {
  email: string;
  name: string;
  surname: string;
  id?: string;
};

export type UserState = {
  user: User | null;
};

export type UserAction = { type: 'SET_USER'; payload: User | null } | { type: 'LOGOUT_USER' };

export type UserStoreContext = {
  dispatch: Dispatch<UserAction>;
  state: UserState;
};

export type UserProviderProps = {
  children: React.ReactNode;
};
