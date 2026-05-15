import apiClient from '@services/api/apiClient';
import { API_ENDPOINTS } from '@constants/api.constants';

export const getDashboardStats    = () => apiClient.get(API_ENDPOINTS.DASHBOARD.STATS);
export const getDashboardActivity = () => apiClient.get(API_ENDPOINTS.DASHBOARD.ACTIVITY);
