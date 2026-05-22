import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import ErrorBoundary from '@components/shared/ErrorBoundary';
import CareBot from '@components/shared/CareBot';

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
      style={{ background: '#dde1f0' }}
    >
      {/* Sidebar — floating card with built-in gap */}
      <Sidebar />

      {/* Main area — takes all remaining width */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar title={title} />
        <main
          className="flex-1 overflow-y-auto mobile-content-bottom-padding"
          style={{ padding: '18px 20px 18px 16px' }}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      {/* Care Bot — fixed FAB, available on all screens */}
      <CareBot />
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
