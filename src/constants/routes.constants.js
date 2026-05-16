export const ROUTES = {
  HOME:              '/',
  LOGIN:             '/login',
  FORGOT_PASSWORD:   '/forgot-password',
  DASHBOARD:         '/dashboard',
  PATIENTS:          '/patients',
  PATIENT_DETAIL:    (id = ':id') => `/patients/${id}`,
  APPOINTMENTS:      '/appointments',
  MEMBERS:           '/members',
  UNAUTHORIZED:      '/unauthorized',
  NOT_FOUND:         '*',
};
