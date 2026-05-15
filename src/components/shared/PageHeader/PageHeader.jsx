const PageHeader = ({ title, subtitle, actions }) => (
  <div className="flex-between mb-6 flex-wrap gap-4">
    <div>
      <h1 className="text-heading-lg text-text-primary">{title}</h1>
      {subtitle && <p className="text-body-sm text-text-muted mt-0.5">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-3">{actions}</div>}
  </div>
);

export default PageHeader;
