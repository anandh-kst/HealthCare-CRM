const variants = {
  primary:   'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  danger:    'bg-danger text-white hover:bg-danger-dark',
  outline:   'border border-surface-border text-text-primary hover:bg-surface-muted',
  ghost:     'text-text-secondary hover:bg-surface-muted',
};

const sizes = {
  sm: 'px-3 py-1.5 text-caption',
  md: 'px-4 py-2 text-body-sm',
  lg: 'px-6 py-3 text-body-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      inline-flex items-center justify-center gap-2 font-medium rounded-lg
      transition-base focus:outline-none focus:ring-2 focus:ring-primary/40
      disabled:opacity-60 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
  >
    {loading && (
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    )}
    {children}
  </button>
);

export default Button;
