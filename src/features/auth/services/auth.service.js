import apiClient from '@services/api/apiClient';
import { API_ENDPOINTS } from '@constants/api.constants';

export const loginUser = (credentials) =>
  apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

export const logoutUser = () =>
  apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);

export const fetchCurrentUser = () =>
  apiClient.get(API_ENDPOINTS.AUTH.ME);

export const forgotPassword = (email) =>
  apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });

export const resetPassword = (data) =>
  apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
