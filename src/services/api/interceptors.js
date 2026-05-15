import apiClient from './apiClient';

// Lazy import to avoid circular dependency with store
const getStore = () => import('@store/index').then((m) => m.store);

apiClient.interceptors.request.use(
  async (config) => {
    const store = await getStore();
    const token = store.getState().auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      const store = await getStore();
      const { logout } = await import('@features/auth/store/authSlice');
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
