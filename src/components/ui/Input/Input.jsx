const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = '',
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && (
      <label htmlFor={name} className="text-body-sm font-medium text-text-secondary">
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full px-4 py-2 rounded-lg border text-body-sm text-text-primary
        placeholder:text-text-muted bg-surface transition-base
        focus:outline-none focus:ring-2 focus:ring-primary/40
        disabled:opacity-60 disabled:cursor-not-allowed
        ${error ? 'border-danger focus:ring-danger/40' : 'border-surface-border'}
      `}
    />
    {error && <p className="text-caption text-danger">{error}</p>}
  </div>
);

export default Input;
