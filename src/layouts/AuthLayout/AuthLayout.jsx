import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="min-h-screen bg-surface-muted flex-center p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-display-sm text-primary font-bold">Care</h1>
        <p className="text-body-sm text-text-muted mt-1">Healthcare Management Dashboard</p>
      </div>
      <div className="card">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;
