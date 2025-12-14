import { create } from 'zustand';

export type User = {
  email: string;
  name: string;
  surname: string;
  id?: string;
};

interface UserState {
  logoutUser: () => void;
  setUser: (user: User | null) => void;
  user: User | null;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  logoutUser: () => set(() => ({ user: null })),
  setUser: (user) => set(() => ({ user })),
}));
