import apiClient from '@services/api/apiClient';
import { API_ENDPOINTS } from '@constants/api.constants';

export const getAppointments    = (params)     => apiClient.get(API_ENDPOINTS.APPOINTMENTS.BASE, { params });
export const getAppointmentById = (id)         => apiClient.get(API_ENDPOINTS.APPOINTMENTS.BY_ID(id));
export const createAppointment  = (data)       => apiClient.post(API_ENDPOINTS.APPOINTMENTS.BASE, data);
export const updateAppointment  = (id, data)   => apiClient.put(API_ENDPOINTS.APPOINTMENTS.BY_ID(id), data);
export const deleteAppointment  = (id)         => apiClient.delete(API_ENDPOINTS.APPOINTMENTS.BY_ID(id));
