import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ErrorBoundary from '@components/shared/ErrorBoundary';

const pageTitles = {
  '/dashboard':    'Dashboard',
  '/members':      'Members',
  '/patients':     'Patients',
  '/appointments': 'Appointments',
};

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'Dashboard';

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: '#E2E8F0' }}
    >
      {/* Sidebar — floating card with built-in gap */}
      <Sidebar />

      {/* Main area — takes all remaining width */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar title={title} />
        <main
          className="flex-1 overflow-y-auto"
          style={{ padding: '18px 20px 18px 16px' }}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
