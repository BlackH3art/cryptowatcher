import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppContext } from '@/hooks/useAppContext';

export const ProtectedRoute: FC = () => {
  const { user } = useAppContext();

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};