import { ROUTES } from '@constants/routes.constants';

import DashboardPage     from '@pages/dashboard/DashboardPage';
import MembersPage       from '@pages/members/MembersPage';
import PatientsPage      from '@pages/patients/PatientsPage';
import PatientDetailPage from '@pages/patients/PatientDetailPage';
import AppointmentsPage  from '@pages/appointments/AppointmentsPage';
import NotFoundPage      from '@pages/errors/NotFoundPage';
import UnauthorizedPage  from '@pages/errors/UnauthorizedPage';

export const appRoutes = [
  { path: ROUTES.DASHBOARD,        element: DashboardPage },
  { path: ROUTES.MEMBERS,          element: MembersPage },
  { path: ROUTES.PATIENTS,         element: PatientsPage },
  { path: ROUTES.PATIENT_DETAIL(), element: PatientDetailPage },
  { path: ROUTES.APPOINTMENTS,     element: AppointmentsPage },
];

export const errorRoutes = [
  { path: ROUTES.UNAUTHORIZED, element: UnauthorizedPage },
  { path: ROUTES.NOT_FOUND,    element: NotFoundPage },
];
