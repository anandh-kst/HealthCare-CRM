import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@features/auth/hooks/useAuth';
import { ROUTES } from '@constants/routes.constants';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children;
};

export default PrivateRoute;
