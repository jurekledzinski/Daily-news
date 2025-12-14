import { MiddlewareFunction, redirect } from 'react-router';
import { useUserStore } from '@store';

export const authMiddleware: MiddlewareFunction = async () => {
  const store = useUserStore.getState();
  if (!store.user) throw redirect('/');
};
