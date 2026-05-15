import env from './env.config';

const axiosConfig = {
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export default axiosConfig;
