import { formatRelativeTime } from '@utils/date.utils';

const RecentActivity = ({ activity }) => (
  <div className="card">
    <h3 className="text-heading-sm text-text-primary mb-4">Recent Activity</h3>
    {!activity?.length ? (
      <p className="text-body-sm text-text-muted">No recent activity.</p>
    ) : (
      <ul className="space-y-3">
        {activity.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
            <div>
              <p className="text-body-sm text-text-primary">{item.description}</p>
              <p className="text-caption text-text-muted">{formatRelativeTime(item.createdAt)}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default RecentActivity;
