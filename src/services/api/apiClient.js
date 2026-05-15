import axios from 'axios';
import axiosConfig from '@config/axios.config';

const apiClient = axios.create(axiosConfig);

export default apiClient;
