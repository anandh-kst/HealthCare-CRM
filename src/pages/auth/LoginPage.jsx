import { LoginForm } from '@features/auth';

const LoginPage = () => (
  <div>
    <h2 className="text-heading-lg text-text-primary mb-1">Welcome back</h2>
    <p className="text-body-sm text-text-muted mb-6">Sign in to your account</p>
    <LoginForm />
  </div>
);

export default LoginPage;
