import apiClient from '@services/api/apiClient';
import { API_ENDPOINTS } from '@constants/api.constants';

export const getPatients    = (params) => apiClient.get(API_ENDPOINTS.PATIENTS.BASE, { params });
export const getPatientById = (id)     => apiClient.get(API_ENDPOINTS.PATIENTS.BY_ID(id));
export const createPatient  = (data)   => apiClient.post(API_ENDPOINTS.PATIENTS.BASE, data);
export const updatePatient  = (id, data) => apiClient.put(API_ENDPOINTS.PATIENTS.BY_ID(id), data);
export const deletePatient  = (id)     => apiClient.delete(API_ENDPOINTS.PATIENTS.BY_ID(id));
