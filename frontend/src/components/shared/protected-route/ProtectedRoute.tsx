import { Navigate } from 'react-router';
import { ProtectedRouteProps } from './types';
import { useUserStore } from '@/store';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const data = useUserStore();

  if (!data.state.user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
