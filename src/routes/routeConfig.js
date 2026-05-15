import { lazy } from 'react';
import { ROUTES } from '@constants/routes.constants';

const DashboardPage     = lazy(() => import('@pages/dashboard/DashboardPage'));
const PatientsPage      = lazy(() => import('@pages/patients/PatientsPage'));
const PatientDetailPage = lazy(() => import('@pages/patients/PatientDetailPage'));
const AppointmentsPage  = lazy(() => import('@pages/appointments/AppointmentsPage'));
const NotFoundPage      = lazy(() => import('@pages/errors/NotFoundPage'));
const UnauthorizedPage  = lazy(() => import('@pages/errors/UnauthorizedPage'));

export const appRoutes = [
  { path: ROUTES.DASHBOARD,        element: DashboardPage },
  { path: ROUTES.PATIENTS,         element: PatientsPage },
  { path: ROUTES.PATIENT_DETAIL(), element: PatientDetailPage },
  { path: ROUTES.APPOINTMENTS,     element: AppointmentsPage },
];

export const errorRoutes = [
  { path: ROUTES.UNAUTHORIZED, element: UnauthorizedPage },
  { path: ROUTES.NOT_FOUND,    element: NotFoundPage },
];
