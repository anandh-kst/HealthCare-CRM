export const ROUTES = {
  HOME:              '/',
  LOGIN:             '/login',
  FORGOT_PASSWORD:   '/forgot-password',
  DASHBOARD:         '/dashboard',
  PATIENTS:          '/patients',
  PATIENT_DETAIL:    (id = ':id') => `/patients/${id}`,
  APPOINTMENTS:      '/appointments',
  UNAUTHORIZED:      '/unauthorized',
  NOT_FOUND:         '*',
};
