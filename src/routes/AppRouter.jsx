import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@layouts';
import { appRoutes, errorRoutes } from './routeConfig';
import Spinner from '@components/ui/Spinner';
import { ROUTES } from '@constants/routes.constants';

const AppRouter = () => (
  <Suspense fallback={<Spinner size="lg" />}>
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      <Route element={<DashboardLayout />}>
        {appRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      {errorRoutes.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  </Suspense>
);

export default AppRouter;
