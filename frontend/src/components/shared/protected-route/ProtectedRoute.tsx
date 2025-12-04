import { getCookie } from '@/helpers';
import { Navigate } from 'react-router';
import { ProtectedRouteProps } from './types';
import { useUserStore } from '@/store';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const data = useUserStore();
  const enabled = getCookie('enable');

  if (!data.state.user && !enabled) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
