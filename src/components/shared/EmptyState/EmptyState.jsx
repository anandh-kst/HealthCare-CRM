const EmptyState = ({ message = 'No data found.', action }) => (
  <div className="flex-center flex-col gap-3 py-16 text-center">
    <div className="w-14 h-14 rounded-full bg-surface-muted flex-center text-text-muted text-2xl">∅</div>
    <p className="text-body-sm text-text-muted">{message}</p>
    {action && action}
  </div>
);

export default EmptyState;
