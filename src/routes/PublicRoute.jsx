import { Navigate } from 'react-router-dom';
import useAuth from '@features/auth/hooks/useAuth';
import { ROUTES } from '@constants/routes.constants';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : children;
};

export default PublicRoute;
