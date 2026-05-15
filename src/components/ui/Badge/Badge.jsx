const variants = {
  primary:   'bg-primary/10 text-primary',
  success:   'bg-success/10 text-success',
  warning:   'bg-warning/10 text-warning',
  danger:    'bg-danger/10 text-danger',
  secondary: 'bg-secondary/10 text-secondary',
  muted:     'bg-surface-border text-text-muted',
};

const Badge = ({ label, variant = 'primary', className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium ${variants[variant]} ${className}`}>
    {label}
  </span>
);

export default Badge;
