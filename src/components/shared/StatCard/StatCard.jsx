const colorMap = {
  primary:   'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success:   'bg-success/10 text-success',
  danger:    'bg-danger/10 text-danger',
  warning:   'bg-warning/10 text-warning',
};

const StatCard = ({ label, value, color = 'primary', icon }) => (
  <div className="card flex-between">
    <div>
      <p className="text-body-sm text-text-muted mb-1">{label}</p>
      <p className="text-display-sm text-text-primary">{value ?? '—'}</p>
    </div>
    {icon && (
      <div className={`w-12 h-12 rounded-card flex-center text-xl ${colorMap[color]}`}>
        {icon}
      </div>
    )}
  </div>
);

export default StatCard;
