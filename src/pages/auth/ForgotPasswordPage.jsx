import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes.constants';

const ForgotPasswordPage = () => (
  <div>
    <h2 className="text-heading-lg text-text-primary mb-1">Reset Password</h2>
    <p className="text-body-sm text-text-muted mb-6">Enter your email to receive a reset link.</p>
    <Link to={ROUTES.LOGIN} className="text-body-sm text-primary hover:underline">
      ← Back to login
    </Link>
  </div>
);

export default ForgotPasswordPage;
