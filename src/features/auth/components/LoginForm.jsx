import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      {error && (
        <p className="text-sm text-danger bg-danger/10 px-4 py-2 rounded-lg">{error}</p>
      )}
      <div>
        <label className="block text-body-sm font-medium text-text-secondary mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-surface-border rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="doctor@hospital.com"
        />
      </div>
      <div>
        <label className="block text-body-sm font-medium text-text-secondary mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-surface-border rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-2 rounded-lg text-body-sm font-medium hover:bg-primary-dark transition-base disabled:opacity-60"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;
