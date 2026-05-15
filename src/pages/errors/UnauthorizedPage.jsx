import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes.constants';

const UnauthorizedPage = () => (
  <div className="min-h-screen flex-center flex-col gap-4 text-center p-8">
    <div className="w-20 h-20 rounded-full bg-danger/10 flex-center text-danger text-3xl">🔒</div>
    <h2 className="text-heading-lg text-text-primary">Access Denied</h2>
    <p className="text-body-sm text-text-muted max-w-sm">
      You don't have permission to view this page.
    </p>
    <Link
      to={ROUTES.DASHBOARD}
      className="px-6 py-2 bg-primary text-white rounded-lg text-body-sm font-medium hover:bg-primary-dark transition-base"
    >
      Go to Dashboard
    </Link>
  </div>
);

export default UnauthorizedPage;
