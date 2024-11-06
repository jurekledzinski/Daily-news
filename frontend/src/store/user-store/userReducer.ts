import { UserAction, UserState } from './types';

export const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload };
    case 'LOGOUT_USER':
      return { user: null };
    default:
      return state;
  }
};
