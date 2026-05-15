import { useAppSelector, useAppDispatch } from '@store/index';
import { login, logout, fetchMe, clearError } from '../store/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, status, error } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    status,
    error,
    isAuthenticated: !!token,
    isLoading: status === 'loading',
    login:      (credentials) => dispatch(login(credentials)),
    logout:     () => dispatch(logout()),
    fetchMe:    () => dispatch(fetchMe()),
    clearError: () => dispatch(clearError()),
  };
};

export default useAuth;
