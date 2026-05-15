import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes.constants';

const NotFoundPage = () => (
  <div className="min-h-screen flex-center flex-col gap-4 text-center p-8">
    <h1 className="text-display-lg text-primary font-bold">404</h1>
    <h2 className="text-heading-lg text-text-primary">Page Not Found</h2>
    <p className="text-body-sm text-text-muted max-w-sm">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link
      to={ROUTES.DASHBOARD}
      className="px-6 py-2 bg-primary text-white rounded-lg text-body-sm font-medium hover:bg-primary-dark transition-base"
    >
      Go to Dashboard
    </Link>
  </div>
);

export default NotFoundPage;
