export const API_ENDPOINTS = {
  AUTH: {
    LOGIN:           '/auth/login',
    LOGOUT:          '/auth/logout',
    REFRESH:         '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD:  '/auth/reset-password',
    ME:              '/auth/me',
  },
  PATIENTS: {
    BASE:   '/patients',
    BY_ID:  (id) => `/patients/${id}`,
  },
  APPOINTMENTS: {
    BASE:   '/appointments',
    BY_ID:  (id) => `/appointments/${id}`,
  },
  DASHBOARD: {
    STATS:    '/dashboard/stats',
    ACTIVITY: '/dashboard/activity',
  },
};
